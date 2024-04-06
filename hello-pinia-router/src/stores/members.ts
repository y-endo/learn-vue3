import { defineStore } from 'pinia';
import type { Member } from '@/interfaces';

interface State {
  memberList: Map<number, Member>;
  isLoading: boolean;
}

let _database: IDBDatabase;
async function getDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (_database) {
      resolve(_database);
    } else {
      const request = indexedDB.open('asyncdb', 1);
      request.onupgradeneeded = event => {
        const target = event.target as IDBOpenDBRequest;
        const database = target.result as IDBDatabase;
        database.createObjectStore('members', { keyPath: 'id' });
      };
      request.onsuccess = event => {
        const target = event.target as IDBOpenDBRequest;
        _database = target.result as IDBDatabase;
        resolve(_database);
      };
      request.onerror = () => {
        reject(new Error('Error'));
      };
    }
  });
}

const useMembersStore = defineStore({
  id: 'members',
  state: (): State => {
    return {
      memberList: new Map<number, Member>(),
      isLoading: true
    };
  },
  getters: {
    getById: state => {
      return (id: number): Member => {
        const member = state.memberList.get(id) as Member;
        return member;
      };
    },
    isMemberListEmpty: (state): boolean => {
      return state.memberList.size === 0;
    }
  },
  actions: {
    async prepareMemberList(): Promise<boolean> {
      const database = await getDatabase();
      return new Promise<boolean>((resolve, reject) => {
        const transaction = database.transaction('members', 'readonly');
        const objectStore = transaction.objectStore('members');
        const memberList = new Map<number, Member>();
        const request = objectStore.openCursor();
        request.onsuccess = event => {
          const target = event.target as IDBRequest;
          const cursor = target.result as IDBCursorWithValue;
          if (cursor) {
            const id = cursor.key as number;
            const member = cursor.value as Member;
            memberList.set(id, member);
            cursor.continue();
          }
        };
        transaction.oncomplete = () => {
          this.memberList = memberList;
          this.isLoading = false;
          resolve(true);
        };
        transaction.onerror = () => {
          reject(new Error('Error'));
        };
      });
    },
    async insertMember(member: Member): Promise<boolean> {
      const memberAdd: Member = {
        ...member
      };
      const database = await getDatabase();
      return new Promise<boolean>((resolve, reject) => {
        const transaction = database.transaction('members', 'readwrite');
        const objectStore = transaction.objectStore('members');
        objectStore.put(memberAdd);
        transaction.oncomplete = () => {
          resolve(true);
        };
        transaction.onerror = () => {
          reject(new Error('Error'));
        };
      });
    }
  }
});

export default useMembersStore;

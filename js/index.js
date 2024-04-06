(() => {
  const app = {
    initialize() {
      document
        .querySelector('.js-long-long-button-so-long')
        .addEventListener('click', () => console.log('long'));
    }
  };

  app.initialize();
})();

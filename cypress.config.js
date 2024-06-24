const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

    },
    baseUrl: 'https://pushing-it.vercel.app/',
    watchForFileChanges: false,
    defaultCommandTimeout: 6000, 
  },
  env: {
    usuario: 'pushingit',
    contraseña: '123456!'
  }
});
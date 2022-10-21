const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {PORT} = require('./src/config.js') 

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log('%s listening'); // eslint-disable-line no-console
  });
});

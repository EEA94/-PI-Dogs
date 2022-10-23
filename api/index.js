const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {DB_PORT} = require('./src/config.js')


// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  try {
    await conn.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  server.listen(DB_PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
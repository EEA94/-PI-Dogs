const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {PORT_ACCESS} = require('./src/config.js') 

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT_ACCESS , () => {
    console.log('%s listening at 3001', PORT_ACCESS); // eslint-disable-line no-console
  });
});

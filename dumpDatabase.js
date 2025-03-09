const mysqldump = require('mysqldump');

mysqldump({
  connection: {
    host: '127.0.0.1',
    user: 'varadi',
    password: 'password',
    database: 'fridge_database',
  },
  dumpToFile: './fridge_database.sql',
})
  .then(() => {
    console.log('Database dump completed successfully.');
  })
  .catch((err) => {
    console.error('Error during database dump:', err);
  });

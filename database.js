const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'farazz',
  password: 'faraz1234',
  database: 'schoolmanagement'
});

connection.connect(function(err) {
  if (err){
    console.log('database connection error');
  }
  console.log("Connected!");
});

module.exports.connection = connection;

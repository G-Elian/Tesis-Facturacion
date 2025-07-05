const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'agua_potable'
});

db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
    throw err;
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = db;

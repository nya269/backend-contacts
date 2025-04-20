const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('✅ Connexion à la base de données réussie !');
});

module.exports = connection;
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'people',
});

connection.connect();

app.get('/', (req, res) => {
  const name = 'Full Cycle Rocks!';
  const insertQuery = `INSERT INTO people (name) VALUES ('${name}')`;

  connection.query(insertQuery, (error, results) => {
    if (error) throw error;

    connection.query('SELECT * FROM people', (error, results) => {
      if (error) throw error;

      const names = results.map(result => result.name).join(', ');

      res.send(`<h1>${name}</h1><p>Lista de nomes cadastrada no banco de dados: ${names}</p>`);
    });
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

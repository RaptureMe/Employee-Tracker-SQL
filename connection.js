const mysql = require('mysql2');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Godisgood",
  database: "employee_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

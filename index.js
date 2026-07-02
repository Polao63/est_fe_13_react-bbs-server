const express = require("express");
var cors = require('cors');
const mysql = require('mysql2')
const app = express();
const port = 3000;


var corsOptions = {
  origin: '*'
};

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rkwkrhrh123',
  database: 'bbs',
})

connection.connect();



app.use(cors(corsOptions));

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) //json->object

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/list", (req, res) => {
  const sqlQuery = 
    "SELECT id, title, content, writer, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM board;";
  connection.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(result);
  });  
});

app.post("/write", (req, res) => {
  console.log(req.body);
  const {title, name, content} = req.body;

  const sqlQuery = 
    "INSERT INTO board (title,content,writer) values (?,?,?);";
  connection.query(sqlQuery, [title, content, name], (err, result) => {
    if (err) throw err;
    res.send(result);
  });  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

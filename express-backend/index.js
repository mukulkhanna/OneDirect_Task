const express = require('express')
const mysql = require('mysql')

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '123456',
  port: 8888
})

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})


// const app = express()

// app.get('/createDB', (req,res) => {
// })
// let createDBQuery = 'CREATE DATABASE onedirect_project'
// db.query(createDBQuery, (err,result) => {
//   console.log('trying..')
//   if (err) throw err
//   console.log(result)
//   res.send('Database created')
// })


// app.listen('3000', () => {
//   console.log('Server started on port 3000!')
// })
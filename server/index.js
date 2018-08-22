const express = require('express')
const moment = require('moment')

const { Client } = require('pg')

var flights = require('./data').flights

var DATABASE_URL = 'postgres://dfsmdxuektsbnm:867caf952378ac221a5e693b74f89d3a7bffab1f05d7810df465ba694076c6bd@ec2-54-235-242-63.compute-1.amazonaws.com:5432/d5f6obv3unvctp'

const client = new Client({
  connectionString: DATABASE_URL,
  ssl: true
})

client.connect()

var createTable = 'CREATE TABLE flights (id serial PRIMARY KEY, name VARCHAR (25) NOT NULL, fcode VARCHAR (10), origin VARCHAR (20) NOT NULL, ocode VARCHAR (5), destination VARCHAR (20) NOT NULL, dcode VARCHAR (5), departure timestamp NOT NULL, arrival timestamp NOT NULL, price integer NOT NULL, image VARCHAR (100))'

var viewTable = 'SELECT * FROM flights'

var setTimezone = "SET timezone = 'Asia/Kolkata'"

// var insertTuple = `INSERT INTO flights VALUES(1002, 'SpiceJet', 'SG-502', 'Chennai', 'MAA', 'Ahmedabad', 'AMD', '2018-10-01 12:40:21','2018-10-01 15:30:21',2903)`

// var insertTuple = flights.forEach((el, ind) => {
  
//   var query = `INSERT INTO flights VALUES (` + el.id + `,'` + el.name + `',` + `'` + el.fcode + `',` + `'` + el.origin + `',` + `'` + el.ocode + `',` + `'` + el.destination + `',` + `'` + el.dcode + `',` + `'` + el.departure + `',` + `'` + el.arrival + `',` + el.price + `,` + `'` + el.image + `')`
  
//   client.query(query, (err, res) => {
//     console.log(res.rows.length)
//     if (ind === (flights.length - 1)) {
//       client.end()
//     }
//     // var a = moment(res.rows[0].departure)
//     // console.log(a.format('LLLL'))
//   })
// })

client.query(viewTable, (err, res) => {
  console.log(err, res.rows)
  // var a = moment(res.rows[0].departure)
  // console.log(a.format('LLLL'))
  client.end()
})



const app = express()

// app.get('/getFlights', (req,resp) => {

  

// })



app.listen('3000', () => {
  console.log('Server started on port 3000!')
})
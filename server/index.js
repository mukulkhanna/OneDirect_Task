const express = require('express')
const cors = require('cors')
const moment = require('moment')
const bodyParser = require('body-parser')
require('dotenv').config()

var client = require('./db').client
var flights = require('./data').flights


const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())
app.use(cors())

app.use('/',express.static(__dirname + '/../client/dist/'))

app.post('/flights', (req,resp) => {
  var getFlights = `SELECT * FROM flights where origin = '` + req.body.origin + `' and destination = '` + req.body.destination + `'`  
  client.query(getFlights, (err, res) => {
    resp.send(res.rows)
  })
})

app.get('/airports', (req,resp) => {
  var origins = []
  var destinations = []
  var getOrigins = `SELECT DISTINCT origin, ocode FROM flights`
  var getDestinations = `SELECT DISTINCT destination, dcode FROM flights`
  
  client.query(getOrigins, (err,res) => {
    res.rows.forEach((element)=>{
        origins.push(element.origin + ' (' + element.ocode + ')')
      })
    })
    
    client.query(getDestinations, (err,res) => {
    res.rows.forEach((element)=>{
      destinations.push(element.destination + ' (' + element.dcode + ')')
    })
    resp.send({
      origins, destinations
    })
    // client.end()
  })
  
})
    
app.post('/correspondingDestinations', (req, resp) => {
  var getCorrespondingDestinations = `SELECT DISTINCT destination, dcode FROM flights where origin='` + req.body.origin + `'`
  client.query(getCorrespondingDestinations, (err, res) => {
    var temp = []
    res.rows.forEach((element) => {
      temp.push(element.destination + ' (' + element.dcode + ')')
    })
    resp.send(temp)
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000!')
})
    
// var insertTuple = flights.forEach((el, ind) => {
  
//   var querys = `INSERT INTO flights VALUES (` + el.id + `,'` + el.name + `',` + `'` + el.fcode + `',` + `'` + el.origin + `',` + `'` + el.ocode + `',` + `'` + el.destination + `',` + `'` + el.dcode + `',` + `'` + el.departure + `',` + `'` + el.arrival + `',` + el.price + `,` + `'` + el.image + `')`
  
//   client.query(querys, (err, res) => {
//     console.log(ind)
//     if (ind === (flights.length - 1)) {
//       client.end()
//     }
//     // var a = moment(res.rows[0].departure)
//     // console.log(a.format('LLLL'))
//   })
// })

// client.query('TRUNCATE ONLY flights', (err, res) => {
//   console.log(res.rows.length)
//   // var a = moment(res.rows[0].departure)
//   // console.log(a.format('LLLL'))
// })
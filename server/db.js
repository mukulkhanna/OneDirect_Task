require('dotenv').config()
const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

client.connect()

var createTable = 'CREATE TABLE flights (id integer, name VARCHAR (25) NOT NULL, fcode VARCHAR (10), origin VARCHAR (20) NOT NULL, ocode VARCHAR (5), destination VARCHAR (20) NOT NULL, dcode VARCHAR (5), departure timestamp NOT NULL, arrival timestamp NOT NULL, price integer NOT NULL, image VARCHAR (130))'

var viewTable = 'SELECT * FROM flights'

var setTimezone = "SET timezone = 'Asia/Kolkata'"

// client.query(createTable, (err, res) => {
//   if (err) throw err
//   console.log(res)  
// })

module.exports.client = client
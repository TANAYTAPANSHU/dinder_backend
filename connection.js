const {Client} = require('pg')

const databaseConfig = { connectionString: 'postgres://rbrbyaem:eZv4Bp2v6OE6ffeeSzXB209o-vU3jQeE@tiny.db.elephantsql.com/rbrbyaem' };


const client = new Client(databaseConfig)

module.exports = client




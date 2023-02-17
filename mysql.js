const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'nomade_db',
    password: 'nomade6890',
    database: 'nomade',
    socketPath: '/tmp/mysql.sock'
})

db.connect((err) => {
    if (err) throw err
    console.log('Connected to database!')
})

module.exports = db
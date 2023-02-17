const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8000

const db = require('./mysql')

app
  .use(cors())
  .use(express.json())

app.get('/places/:latitude?/:longitude?/:distance?/:search?', (req, res) => {
  const currentLatitude = Number(req.params.latitude) || 0
  const currentLongitude = Number(req.params.longitude) || 0
  const requiredDistance = Number(req.params.distance) || 999999999999
  const searchQuery = req.params.search || ''

  let sql = `SELECT *,
    SQRT(POW(111320 * (ABS(latitude - ?)), 2) + POW(111320 * (ABS(longitude - ?)), 2)) AS distance
    FROM places
    WHERE name like concat('%', ?, '%')
    HAVING distance < ?
    ORDER BY distance
  `

  db.query(sql,
    [
      currentLatitude,
      currentLongitude,
      searchQuery,
      requiredDistance,
    ], (err, queryResult) => {
      if (err) throw err
      res.send(queryResult)
    }
  )
})

app.listen(port, () => {
  console.log(`Nomade API is running on http://localhost:${port}`)
})
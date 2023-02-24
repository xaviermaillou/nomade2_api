const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8000

const db = require('./mysql')

app
  .use(cors())
  .use(express.json())

app.get('/places/:latitude?/:longitude?/:distance?/:search?', (req, res) => {
  const currentLatitude = Number(req.params.latitude) || null
  const currentLongitude = Number(req.params.longitude) || null
  const requiredDistance = Number(req.params.distance) || 999999999999
  const searchQuery = req.params.search || ''

  let sql = (currentLatitude && currentLongitude) ?
  `SELECT *,
    SQRT(POW(111320 * (ABS(latitude - ?)), 2) + POW(111320 * (ABS(longitude - ?)), 2)) AS distance
    FROM places
    WHERE name like concat('%', ?, '%')
    HAVING distance < ?
    ORDER BY distance
  `
  :
  `SELECT *
    FROM places
    WHERE name like concat('%', ?, '%')
  `

  db.query(sql,
    (currentLatitude && currentLongitude) ?
    [
      currentLatitude,
      currentLongitude,
      searchQuery,
      requiredDistance,
    ]
    :
    [
      searchQuery,
    ], (err, queryResult) => {
      if (err) throw err
      res.send(queryResult)
    }
  )
})

app.get('/place/:id/img', (req, res) => {
  const placeId = Number(req.params.id)

  let sql = `SELECT img.id, img.path FROM img
    JOIN img_places_junction ON img.id = img_places_junction.img_id
    JOIN places ON places.id = img_places_junction.place_id
    WHERE places.id = ?
  `

  db.query(sql, [placeId], (err, queryResult) => {
    if (err) throw err
    res.send(queryResult)
  })
})

app.listen(port, () => {
  console.log(`Nomade API is running on http://localhost:${port}`)
})
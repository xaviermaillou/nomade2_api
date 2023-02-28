const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8000

// const db = require('./mysql')
const { sequelize, Img, Place } = require('./src/database')
const { Op } = require('sequelize')

app
  .use(cors())
  .use(express.json())

app.get('/places/:latitude?/:longitude?/:distance?/:search?', (req, res) => {
  const currentLatitude = Number(req.params.latitude) || null
  const currentLongitude = Number(req.params.longitude) || null
  const requiredDistance = Number(req.params.distance) || 999999999999
  const searchQuery = req.params.search || ''

  Place.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(`SQRT(POW(111320 * (ABS(latitude - ${currentLatitude})), 2) + POW(111320 * (ABS(longitude - ${currentLongitude})), 2))`),
          'distance'
        ]
      ]
    },
    where: {
      name: {
        [Op.like]: `%${searchQuery}%`
      }
    },
    having: sequelize.literal(`distance < ${requiredDistance}`),
    order: sequelize.literal('distance')
  }).then(places => {
    res.send(places)
  }).catch(err => {
    res.end(err)
  })
})

app.get('/place/:id/img', (req, res) => {
  const placeId = Number(req.params.id)

  Img.findAll({
    attributes: ['id', 'path'],
    where: {place_id: placeId}
  }).then(imgs => {
    res.send(imgs)
  }).catch(err => {
    console.error(err)
    res.end(err)
  });
})

app.listen(port, () => {
  console.log(`Nomade API is running on http://localhost:${port}`)
})
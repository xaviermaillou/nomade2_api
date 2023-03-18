const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8000

const auth = require('./src/firebase')

const { sequelize, Img, Place } = require('./src/database')
const { Op } = require('sequelize')
const { handleSearchString } = require('./src/lib/common')

app
  .use(cors())
  .use(express.json())

const checkAuthToken = async (token) => {
  const result = await auth.verifyIdToken(token)
  return result
}

app.get('/places/:latitude?/:longitude?/:distance?/:search?', async (req, res) => {
  const currentLatitude = Number(req.params.latitude) || null
  const currentLongitude = Number(req.params.longitude) || null
  const requiredDistance = Number(req.params.distance) || 999999999999
  const searchQuery = handleSearchString(req.params.search)

  const authToken = req.headers.authorization?.split(' ')[1]
  if (authToken) {
    const decodedToken = await checkAuthToken(authToken)
  }

  let searchCriteria
  let filterCriteria
  if (searchQuery) {
    searchCriteria = searchQuery.searchQueryArray.map((query) => ({
      name: {
        [Op.like]: `%${query}%`
      }
    }))
    filterCriteria = searchQuery.keywords.map((keyword) => ({
      [keyword.column]: {
        [Op[keyword.operation]]: keyword.value
      }
    }))
  }

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
      [Op.or]: [ ...searchCriteria, {[Op.and]: [ ...filterCriteria ]} ],
    },
    having: sequelize.literal(`distance < ${requiredDistance}`),
    order: sequelize.literal('distance')
  }).then(places => {
    res.send(places)
  }).catch(err => {
    console.error(err)
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
    console.error(err)
  });
})

app.listen(port, () => {
  console.log(`Nomade API is running on http://localhost:${port}`)
})
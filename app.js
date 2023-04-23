const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8000

const auth = require('./src/firebase')

const { sequelize, User, Img, Place, CoffeeshopDetail, PlaceUser, Warning } = require('./src/database')
const { Op } = require('sequelize')
const { handleSearchString, getAddress } = require('./src/lib/common')

app
  .use(cors())
  .use(express.json())

/* const checkAuthToken = async (token) => {
  const result = await auth.verifyIdToken(token)
  return result
} */

app.post('/users', async (req, res) => {
  const email = req.body.body.email
  const uid = req.body.body.uid
  const type = req.body.body.type

  const responseObject = {
    userUid: uid
  }

  User.create({
    email: email,
    uid: uid,
    type: type
  }).then(result => {
    res.send(responseObject)
  }).catch(err => {
    console.error(err)
  })
})

app.get('/places/:latitude?/:longitude?/:distance?/:search?', async (req, res) => {
  const currentLatitude = Number(req.params.latitude) || null
  const currentLongitude = Number(req.params.longitude) || null
  const requiredDistance = Number(req.params.distance) || 999999999999
  const searchQuery = handleSearchString(req.params.search)

  /* const authToken = req.headers.authorization?.split(' ')[1]
  if (authToken) {
    const decodedToken = await checkAuthToken(authToken)
  } */

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
  })
})

app.get('/place/:id/details', (req, res) => {
  const placeId = Number(req.params.id)

  CoffeeshopDetail.findAll({
    attributes: ['id', 'gluten_free_food', 'vegetal_milk', 'vegan_food', 'decaf'],
    where: {place_id: placeId}
  }).then(details => {
    res.send(details)
  }).catch(err => {
    console.error(err)
  })
})

app.get('/place/:id/preferences/:uid', (req, res) => {
  const placeId = Number(req.params.id)
  const userUid = String(req.params.uid)

  PlaceUser.findOne({
    attributes: ['liked', 'notes'],
    where: {place_id: placeId, user_uid: userUid}
  }).then(preferences => {
    res.send(preferences)
  }).catch(err => {
    console.error(err)
  })
})

app.post('/place/:id/preferences/:uid', (req, res) => {
  const placeId = Number(req.params.id)
  const userUid = String(req.params.uid)
  const liked = req.body.body.liked
  const notes = req.body.body.notes

  const responseObject = {
    placeId,
    userUid,
  }

  PlaceUser.create({
    place_id: placeId,
    user_uid: userUid,
    liked: liked,
    notes: notes
  }).then(result => {
    res.send(responseObject)
  }).catch(err => {
    console.error(err)
  })
})

app.patch('/place/:id/preferences/:uid', (req, res) => {
  const placeId = Number(req.params.id)
  const userUid = String(req.params.uid)
  const liked = req.body.body.liked
  const notes = req.body.body.notes

  const responseObject = {
    placeId,
    userUid,
  }

  PlaceUser.update(
    { liked, notes },
    {
      where: { place_id: placeId, user_uid: userUid }
    }
  ).then(result => {
    res.send(responseObject)
  }).catch(err => {
    console.error(err)
  })
})

app.delete('/place/:id/preferences/:uid', (req, res) => {
  const placeId = Number(req.params.id)
  const userUid = String(req.params.uid)

  const responseObject = {
    placeId,
    userUid,
  }

  PlaceUser.destroy({
    where: {place_id: placeId, user_uid: userUid}
  }).then(status => {
    res.send(responseObject)
  }).catch(err => {
    console.error(err)
  })
})

app.post('/place/:id/warning/:uid', (req, res) => {
  const placeId = Number(req.params.id)
  const userUid = String(req.params.uid)
  const message = req.body.body.message

  const responseObject = {
    placeId,
    userUid,
  }

  Warning.create({
    place_id: placeId,
    user_uid: userUid,
    message: message
  }).then(result => {
    res.send(responseObject)
  }).catch(err => {
    console.error(err)
  })
})

app.listen(port, () => {
  console.log(`Nomade API is running on http://localhost:${port}`)
})
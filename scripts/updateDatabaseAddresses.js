const { sequelize, Img, Place, CoffeeshopDetail } = require('../src/database')
const { Op } = require('sequelize')
const { getAddress } = require('../src/lib/common')

Place.findAll().then(async (places) => {
    for (const place of places) {
        if (!place.address) {
            const address = await getAddress(place.latitude, place.longitude)
            Place.update(
                { address: address },
                { where: { id: place.id } }
            ).then(() => console.log('New address injected')).catch(err => console.error(err))
        }
    }
}).catch(err => {
    console.error(err)
})
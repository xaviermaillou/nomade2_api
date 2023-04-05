const { default: axios } = require("axios")
const { searchQueryKeywords } = require("./dictionary")

module.exports = {
    handleSearchString: (string) => {
        if (string) {
            const searchQueryArray = string.split(' ')
            const keywords = []
            searchQueryArray.forEach((string) => {
                if (searchQueryKeywords[string]) keywords.push(searchQueryKeywords[string])
            })
            return {
                searchQueryArray,
                keywords
            }
        }
        else return {
            searchQueryArray: [''],
            keywords: []
        }
    },
    getAddress: async (latitude, longitude) => {
        const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoieGF2aWVyamVhbiIsImEiOiJjbGUzYXl1dXAwM2g5M25tcHBhcnowc3pmIn0.5AXUHhsjd3pfaGVQObJ72w`)
        return result.data.features[0].properties.address
    }
}
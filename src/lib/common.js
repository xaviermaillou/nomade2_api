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
    }
}
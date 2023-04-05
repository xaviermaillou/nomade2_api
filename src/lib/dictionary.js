module.exports = {
    searchQueryKeywords: {
        'cafe': {
            column: 'type',
            operation: 'eq',
            value: '1'
        },
        'quiet': {
            column: 'quiet',
            operation: 'gt',
            value: '2'
        },
        'calm': {
            column: 'quiet',
            operation: 'gt',
            value: '2'
        },
        'noisy': {
            column: 'quiet',
            operation: 'lt',
            value: '3'
        },
        'busy': {
            column: 'quiet',
            operation: 'lt',
            value: '3'
        },
        'wifi': {
            column: 'wifi',
            operation: 'gt',
            value: '2'
        },
        'connection': {
            column: 'wifi',
            operation: 'gt',
            value: '2'
        },
        'outlet': {
            column: 'outlet',
            operation: 'gt',
            value: '0'
        },
        'plug': {
            column: 'outlet',
            operation: 'gt',
            value: '0'
        },
    }
}
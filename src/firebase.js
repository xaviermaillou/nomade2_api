const { initializeApp } = require('firebase-admin/app')
const { getAuth } = require('firebase-admin/auth')

const firebaseConfig = {
    apiKey: "AIzaSyA7S2Omf4oBCVAxS50FzSR18JSO61RbLdo",
    authDomain: "nomade-336c9.firebaseapp.com",
    projectId: "nomade-336c9",
    storageBucket: "nomade-336c9.appspot.com",
    messagingSenderId: "1067065605672",
    appId: "1:1067065605672:web:233bd4d2024a9d639a3f1d"
}

const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)

module.exports = auth
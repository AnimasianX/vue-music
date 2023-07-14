import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCQDJnS6oJmJg_4BoZkSt8fpezmbv8yHX4",

    authDomain: "music-47882.firebaseapp.com",

    projectId: "music-47882",

    storageBucket: "music-47882.appspot.com",

    messagingSenderId: "152142132633",

    appId: "1:152142132633:web:36924eed6222961f494f08"
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection('users')

export {
    auth,
    db,
    usersCollection,
}
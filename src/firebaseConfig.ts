import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDuTWOaZb-m8v1BvqYim3jMlvb-79NvXqY",
    authDomain: "upclick-8205b.firebaseapp.com",
    projectId: "upclick-8205b",
    storageBucket: "upclick-8205b.appspot.com",
    messagingSenderId: "162545740883",
    appId: "1:162545740883:web:c9f538d6dd939be05f2aa6"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

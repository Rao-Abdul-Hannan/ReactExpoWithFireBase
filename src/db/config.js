import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const configuration = {
    apiKey: "AIzaSyDhLOkKhf2Fys5r1IxZxQoXDf8_WYWni-k",
    authDomain: "my-awesome-project-96364.firebaseapp.com",
    projectId: "my-awesome-project-96364",
    storageBucket: "my-awesome-project-96364.appspot.com",
    messagingSenderId: "555043903682",
    appId: "1:555043903682:web:1e0f8ced8832601703c35b",
    measurementId: "G-ZT0BYC2FK7"
}

const app = initializeApp(configuration);

const db = getFirestore(app);
export { app, db};
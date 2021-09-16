import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyC61-NU1R2vUNIUynZxxzOGXMZ6nS0U-C8",
  authDomain: "visitor-management-syste-3b19d.firebaseapp.com",
  projectId: "visitor-management-syste-3b19d",
  storageBucket: "visitor-management-syste-3b19d.appspot.com",
  messagingSenderId: "149284958767",
  appId: "1:149284958767:web:e78f51e48168afdad7ccda"
};

const app = firebase.initializeApp(firebaseConfig);
const database = app.firestore();
const authentication = app.auth();

export { authentication, database };


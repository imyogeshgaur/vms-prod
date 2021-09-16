import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyBDu990Fa5nVoM1-mQmaxR9k--KDgm08VM",
  authDomain: "vistor-management-system-1c98c.firebaseapp.com",
  projectId: "vistor-management-system-1c98c",
  storageBucket: "vistor-management-system-1c98c.appspot.com",
  messagingSenderId: "492966676663",
  appId: "1:492966676663:web:5bef6c59b220952d632532"
};

const app = firebase.initializeApp(firebaseConfig);
const database = app.firestore();
const authentication = app.auth();

export { authentication, database };


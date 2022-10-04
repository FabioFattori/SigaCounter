import{initializeApp}from'firebase/app'
  import{getFirestore}from'firebase/firestore'

  const firebaseConfig = {
    apiKey: "AIzaSyBQQQuxAFD-uPuEnJfqPI0wcWtEaGnE_hs",
    authDomain: "sigacounter.firebaseapp.com",
    databaseURL: "https://sigacounter-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sigacounter",
    storageBucket: "sigacounter.appspot.com",
    messagingSenderId: "875016612537",
    appId: "1:875016612537:web:dccda9e655936932b5c968"
  };

// Import the functions you need from the SDKs you need

  // Your web app's Firebase configuration
 
  // Initialize Firebase
  const app=initializeApp(firebaseConfig)

  export const DB=getFirestore(app)
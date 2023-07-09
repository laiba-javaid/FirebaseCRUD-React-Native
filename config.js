import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD-mpjh83GnwTzfnzPzTEpBAwwJyZsc_J4",
    authDomain: "fetch-data-8bae3.firebaseapp.com",
    projectId: "fetch-data-8bae3",
    storageBucket: "fetch-data-8bae3.appspot.com",
    messagingSenderId: "343110748003",
    appId: "1:343110748003:web:81814c7bd7baaa7be13556"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

export {firebase};


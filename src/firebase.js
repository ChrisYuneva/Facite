import { initializeApp } from 'firebase/app';

// console.log(process.env)

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_API_ID
// };

const firebaseConfig = {
  apiKey: 'AIzaSyDZkz3B702sHnKbZn5pmr9dVMUNrMtMapU',
  authDomain: 'facite-aeaf7.firebaseapp.com',
  projectId: 'facite-aeaf7',
  storageBucket: 'facite-aeaf7.appspot.com',
  messagingSenderId: 188242235209,
  appId: '1:188242235209:web:baf8f4153ac5315d5b1498'
};


const app = initializeApp(firebaseConfig);
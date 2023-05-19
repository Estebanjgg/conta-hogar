import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCgZHXn4sruG_KIZks1d63gccMlcc1uNmY",
  authDomain: "usuarioconta-a282d.firebaseapp.com",
  projectId: "usuarioconta-a282d",
  storageBucket: "usuarioconta-a282d.appspot.com",
  messagingSenderId: "572917886708",
  appId: "1:572917886708:web:081ab468da859eecc478a1"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const auth = firebase.auth();
export const db = firebase.firestore();
// import 'dotenv/config';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../js/config';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { authAccess, authDecline, viewUpdate, createDataObject } from '../';

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

const db = getDatabase();

onAuthStateChanged(auth, user => {
  if (user) {
    authAccess(user);
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
  } else {
    authDecline();
    // User is signed out
    // ...
  }
});
function authWithPopup() {
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

function onClickSignOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
    });
}

function pushData(data) {
  push(ref(db, 'messages'), data)
    .then(() => {
      console.log(`success`);
      // Data saved successfully!
    })
    .catch(error => {
      console.log(`Error`);
      // The write failed...
    });
}

const starCountRef = ref(db, 'messages');
onValue(starCountRef, snapshot => {
  const data = snapshot.val();
  console.log(data);
  viewUpdate(Object.values(data));
  // updateStarCount(postElement, data);
});

export { authWithPopup, onClickSignOut, pushData };

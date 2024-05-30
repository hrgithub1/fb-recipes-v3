// IMPORT FIREBASE FROM FIREBASE
//

// import firebase is not enough, https://stackoverflow.com/questions/70445014/module-not-found-error-package-path-is-not-exported-from-package
// import firebase from 'firebase';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// variable (object) that holds the variables needed (see firebase project at console),
// replace the hardcoded values by the constants as set in .env file
// - set cursor before first k/v pair
// - hold option + cmd, and down arrow
// - hold option, and right arrow => travels word by word
// - hold shift + cmd, and right arrow => selects entire remaining sentence
// (- hold shift + option, and right arrow => selects first right word)
// - highlighted words delete
// Than do Copy from .env file
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;

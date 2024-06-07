// import the pre-configured firebase object
import firebase from './FirebaseConfig';

// create firestore variable, for accessing
const firestore = firebase.firestore();

/**
 * firestore functions that are exported, so to be used in any JS application
 */

const createDocument = (collection, document) => {
  console.log('starting to create a document in service file');

  return firestore.collection(collection).add(document);
};

// make wrapper variable around create document function into object
// and export object
const FirebaseFirestoreService = {
  createDocument,
};

export default FirebaseFirestoreService;

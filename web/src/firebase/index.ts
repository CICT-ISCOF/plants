import Firebase from 'firebase';
import config from './config';

const firebase = Firebase.initializeApp(config);
firebase.firestore().enablePersistence().catch(console.log);
firebase.analytics();

export default firebase;

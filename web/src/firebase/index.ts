import Firebase from 'firebase';
import config from './config';

const firebase = Firebase.initializeApp(config);
firebase.analytics();

export default firebase;

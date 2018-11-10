import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDP4wpJpPWmSwpCrsm-2Wz2VEyE5JfQeCI',
  authDomain: 'onpoint-events-57868.firebaseapp.com',
  databaseURL: 'https://onpoint-events-57868.firebaseio.com',
  projectId: 'onpoint-events-57868',
  storageBucket: 'onpoint-events-57868.appspot.com',
  messagingSenderId: '132523792003'
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;

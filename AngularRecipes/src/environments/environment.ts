// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Your web app's Firebase configuration
  firebaseConfig: {
    apiKey: 'AIzaSyDXvj2Nwdq-UStlqkfUm02SyVZ_5R5P3gU',
    authDomain: 'angularcourse-bc12b.firebaseapp.com',
    databaseURL: 'https://angularcourse-bc12b.firebaseio.com/',
    projectId: 'angularcourse-bc12b',
    storageBucket: 'angularcourse-bc12b.appspot.com',
    messagingSenderId: '79975734273',
    appId: '1:79975734273:web:f5c336e04797f2d8ff3400',
    measurementId: 'G-QYPHRZ3MH1'
  },
};
/* esto es mio
// added .firestore to test firestore locally w/ emulator 
const db = firebase.initializeApp(firebaseConfig).firestore(); 

// for debugging
firebase.firestore.setLogLevel('debug')

// Uncomment the below line to use cloud functions with the emulator
firebase.functions().useFunctionsEmulator('http://localhost:5001')
// firebase.firestore().settings({ experimentalForceLongPolling: true });

// uncomment this to test firestore locally w/ emulator 
  db.settings({
    host: "localhost:8080",
    ssl: false
  });
   */

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

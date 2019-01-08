import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyDoOLeqBgQRQtK6Sn_XPWfJ6MrnOk8cBFg',
  authDomain: 'bibliographya-65e17.firebaseapp.com',
  databaseURL: 'https://bibliographya-65e17.firebaseio.com',
  projectId: 'bibliographya-65e17',
  storageBucket: 'bibliographya-65e17.appspot.com',
  messagingSenderId: '221394319181'
})

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()

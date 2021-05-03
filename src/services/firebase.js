import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBBSUYMbCDDz8aAU7YbIGnII6TKFGT9tj8",
    authDomain: "simpletut-f8af4.firebaseapp.com",
    projectId: "simpletut-f8af4",
    storageBucket: "simpletut-f8af4.appspot.com",
    messagingSenderId: "537460580639",
    appId: "1:537460580639:web:36ae9d568fbb448bda902a"
  };
  // Initialize Firebase

firebase.initializeApp(firebaseConfig);
const fbApp = firebase.app()

export const handleUserProfile = async (userAuth, additionalData)=>{

  if(!userAuth) return

  const {uid} = userAuth

  // const userRef = fbApp()..doc(`users/${uid}`)
  const userRef= fbApp.firestore().doc(`usrs/${uid}`)
  const userSnapshot = await userRef.get()

  if(!userSnapshot.exists){

      const {displayName, email, photoURL} = userAuth
      const timeStamp = new Date()

      try {

          await userRef.set({
              displayName,
              email,
              createdDate: timeStamp,
              ...additionalData,
              picture: photoURL

          })
          
      } catch (error) {
          console.log(error);
      }

  }

  return userRef

}

export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider
export default fbApp
// export default firebase


import fbApp from "../services/firebase"

const firestore = fbApp.firestore()

const handleUserProfile = async (userAuth, additionalData)=>{

    if(!userAuth) return

    const {uid} = userAuth

    const userRef = firestore.doc(`users/${uid}`)
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

export default handleUserProfile
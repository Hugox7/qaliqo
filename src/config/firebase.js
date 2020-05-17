import firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");
require('firebase/storage');

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
  };

firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();


// - - - - API firebase - - - - //


//generate user document in firestore after sign up
export const generateUserDocument = async (user, displayName) => {
    if (!user) return;
    const users = firestore.collection('users');
    const currentUser = user.userCreated.user;
    
    try {
        await users.doc(currentUser.uid).set({
            username: displayName,
            email: currentUser.email,
            id: currentUser.uid,
            creation: Date.now(),
        })
    } catch (error) {
        console.log('Error creating the document : ', error);
        }
    
    await updateDisplayName(displayName);
    
}

//get user document from firestore related to auth user
export const getUserDocument = async (user) => {
    if (!user) return null;
    try {
        const userDocument = await firestore.doc(`users/${user.uid}`).get();
        return {
            //uid: user.uid,
            ...userDocument.data(),
        }
    } catch (error) {
        console.log(error);
    }
}

// update auth displayName after document creation (used in generateUserDocument function)
const updateDisplayName = async (displayName) => {
    const user = auth.currentUser;
    try {
        await user.updateProfile({
            displayName,
        });
    } catch (error) {
        console.log(error);
    }
}

//sign up
export const signUp = async (email, password, displayName, setError) => {
    try {
        const userCreated = await auth.createUserWithEmailAndPassword(email, password);
        await generateUserDocument({ userCreated }, displayName);
    } catch (error) {
        console.log(error);
        setError(error);
    }  
}

//sign in
export const signIn = async (email, password, setError) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        setError(null);
    } catch (error) {
        console.log(error.message);
        setError(error);
    }
}

// reset password
export const resetPassword = async (email, setEmailHasBeenSent, setError) => {
    try {
        await auth.sendPasswordResetEmail(email);
        setEmailHasBeenSent(true);
    } catch (error) {
        console.log(error);
        setError("Erreur lors de l'envoi du mail. Merci de réessayer ultérieurement.");
    }
}
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


// - - - - API - - - - //


//generate user document in firestore after sign up
export const generateUserDocument = async (user, displayName) => {
    if (!user) return;
    const users = firestore.collection('users');
    
    try {
        await users.doc(user.user.user.uid).set({
            username: displayName,
            email: user.user.user.email,
            id: user.user.user.uid
        })
    } catch (error) {
        console.log('Error creating the document : ', error);
        }
    
    await updateDisplayName(displayName);
    
}

//get user document from firestore related to auth user
export const getUserDocument = async (uid) => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data(),
        }
    } catch (error) {
        console.log(error);
    }
}

// update auth displayName after document creation
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
export const signUp = async (email, password, displayName, history) => {
    try {
        const userCreated = await auth.createUserWithEmailAndPassword(email, password);
        await generateUserDocument({ userCreated }, displayName);
        await history.push('/')
    } catch (error) {
        console.log(error);
    }
    
}
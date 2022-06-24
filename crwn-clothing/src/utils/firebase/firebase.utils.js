import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW-DuGc1fgDaHDdAT6jOfKMmMX4-Ncegk",
  authDomain: "crwn-clothing-db-dd2a8.firebaseapp.com",
  projectId: "crwn-clothing-db-dd2a8",
  storageBucket: "crwn-clothing-db-dd2a8.appspot.com",
  messagingSenderId: "81453656047",
  appId: "1:81453656047:web:a3f8c4f7a898af2304781a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message);

    }
  }

  // check if user data exists

  return userDocRef;

  // if user data does not exist

  // create / set doc with data
};
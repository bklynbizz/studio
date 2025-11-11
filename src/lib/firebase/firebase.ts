import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { firebaseConfig } from './config';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

// Helper for Google Sign-In
export const getGoogleProvider = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return provider;
}

setPersistence(auth, browserLocalPersistence);


export { app, auth, db, functions };

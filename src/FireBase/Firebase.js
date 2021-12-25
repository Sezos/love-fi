// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import config from "./../config/config";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const app = initializeApp({
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId: config.firebase.appId,
    measurementId: config.firebase.measurementId,
});

export const auth = getAuth(app);

export const firestore = getFirestore(app);

export default app;

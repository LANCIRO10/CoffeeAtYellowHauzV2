import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';
import { normalizeFirebaseConfig, isFirebaseConfigValid } from './firebaseConfig';

const normalizedConfig = normalizeFirebaseConfig(firebaseConfig);
const hasValidFirebaseConfig = isFirebaseConfigValid(normalizedConfig);

if (!hasValidFirebaseConfig) {
  console.warn(
    'Firebase configuration is missing or incomplete. Firestore/Auth features will be disabled until a valid Firebase web config is provided.'
  );
}

const safeFirebaseConfig = hasValidFirebaseConfig ? normalizedConfig : {};

export const app = hasValidFirebaseConfig
  ? getApps().length === 0
    ? initializeApp(safeFirebaseConfig)
    : getApp()
  : null;

export const db = app ? (normalizedConfig.firestoreDatabaseId ? getFirestore(app, normalizedConfig.firestoreDatabaseId) : getFirestore(app)) : null;

export const auth = app ? getAuth(app) : null;

export const isFirebaseEnabled = Boolean(app && db && auth);

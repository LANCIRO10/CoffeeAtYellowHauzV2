export type FirebaseWebConfig = {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  appId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  firestoreDatabaseId?: string;
  measurementId?: string;
  oAuthClientId?: string;
  recaptchaSiteKey?: string;
};

export function normalizeFirebaseConfig(config: unknown): FirebaseWebConfig {
  const source = (config ?? {}) as Record<string, unknown>;

  const readString = (key: string): string => {
    const value = source[key];
    return typeof value === 'string' ? value.trim() : '';
  };

  return {
    apiKey: readString('apiKey'),
    authDomain: readString('authDomain'),
    projectId: readString('projectId'),
    appId: readString('appId'),
    storageBucket: readString('storageBucket'),
    messagingSenderId: readString('messagingSenderId'),
    firestoreDatabaseId: readString('firestoreDatabaseId'),
    measurementId: readString('measurementId'),
    oAuthClientId: readString('oAuthClientId'),
    recaptchaSiteKey: readString('recaptchaSiteKey'),
  };
}

export function isFirebaseConfigValid(config: unknown): boolean {
  const cfg = normalizeFirebaseConfig(config);

  const hasProject = Boolean(cfg.projectId);
  const hasApiKey = Boolean(cfg.apiKey) && cfg.apiKey.startsWith('AIza');
  const hasAppId = Boolean(cfg.appId);
  const hasAuthDomain = Boolean(cfg.authDomain) && cfg.authDomain.includes('firebaseapp.com');

  return hasProject && hasApiKey && hasAppId && hasAuthDomain;
}

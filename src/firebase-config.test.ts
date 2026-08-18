import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isFirebaseConfigValid } from './firebaseConfig.js';

describe('isFirebaseConfigValid', () => {
  it('accepts a complete Firebase web config', () => {
    const config = {
      apiKey: 'AIzaTest',
      authDomain: 'example.firebaseapp.com',
      projectId: 'demo-project',
      appId: '1:123:web:abc',
      messagingSenderId: '123',
      storageBucket: 'demo-project.appspot.com',
    };

    assert.equal(isFirebaseConfigValid(config), true);
  });

  it('rejects a config without a valid api key or project ID', () => {
    assert.equal(
      isFirebaseConfigValid({
        authDomain: 'example.firebaseapp.com',
        appId: '1:123:web:abc',
      }),
      false
    );
  });
});

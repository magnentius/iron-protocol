// Firebase configuration for cross-device battle sync.
//
// These values are PUBLIC by design — Firebase web config is not a secret, and
// shipping it in a static site is the documented, intended usage. Access is
// controlled by the database security rules in firebase.rules.json, not by
// hiding these strings.
//
// Leave this as-is to run the tracker purely offline: every feature except
// cross-device sync works without it, with state saved to this device only.
//
// To turn sync on, follow the setup steps in docs/README.md and paste your own
// project's values here.

export const FIREBASE_CONFIG = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  appId: '',
};

export const FIREBASE_SDK_VERSION = '10.12.0';

export function isSyncConfigured() {
  return Boolean(FIREBASE_CONFIG.databaseURL && FIREBASE_CONFIG.apiKey);
}

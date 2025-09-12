import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

// --- init (lazy singleton) ---
let app, auth, db;
function ensureInit() {
  if (!getApps().length) {
    app = initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    });
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  db = getFirestore(app);
}

// --- helpers ---
async function fetchUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return { username: null, isAdmin: false };
  const data = snap.data();
  return {
    username: data.username ?? null,
    isAdmin: Boolean(data.isAdmin),
  };
}

// Build the app-level user object your Redux slice expects
async function toAppUser(firebaseUser) {
  if (!firebaseUser) return null;
  const { username, isAdmin } = await fetchUserProfile(firebaseUser.uid);
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email,
    username,
    isAdmin,
  };
}
// --- public API ---

// 1) auth state subscription (called once at app start)
export function subscribeToAuthChanges(onChange) {
  ensureInit();
  return onAuthStateChanged(getAuth(), async (fbUser) => {
    const appUser = await toAppUser(fbUser);
    onChange(appUser);
  });
}

// 2) register with email + username + password
export async function register({ email, username, password }) {
  ensureInit();
  const cleanUsername = String(username || "")
    .trim()
    .toLowerCase();
  if (!cleanUsername) throw new Error("USERNAME_REQUIRED");

  // Check username availability
  const usernameRef = doc(db, "usernames", cleanUsername);
  const usernameSnap = await getDoc(usernameRef);
  if (usernameSnap.exists()) {
    throw new Error("USERNAME_TAKEN");
  }

  // Create the auth user
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  // Save profile + username mapping
  await Promise.all([
    setDoc(doc(db, "users", user.uid), {
      email,
      username: cleanUsername,
      isAdmin: false,
      createdAt: serverTimestamp(),
    }),
    setDoc(usernameRef, { uid: user.uid, email }),
    updateProfile(user, { displayName: cleanUsername }).catch(() => {}),
  ]);

  return toAppUser(user);
}

// 3) login with email/username + password
export async function login({ identifier, password }) {
  ensureInit();
  if (!identifier) throw new Error("IDENTIFIER_REQUIRED");

  let email = identifier;
  if (!String(identifier).includes("@")) {
    // Treat as username → map to email
    const usernameRef = doc(db, "usernames", String(identifier).toLowerCase());
    const usernameSnap = await getDoc(usernameRef);
    if (!usernameSnap.exists()) {
      throw new Error("USER_NOT_FOUND");
    }
    email = usernameSnap.data().email;
  }

  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return toAppUser(user);
}

// 4) logout
export async function logout() {
  ensureInit();
  await signOut(auth);
}

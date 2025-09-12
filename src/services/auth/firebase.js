// TODO: install firebase and implement these using Firebase Auth.
// import { initializeApp } from 'firebase/app'
// import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
// import { firebaseConfig } from '../../firebase/config'

export async function initAuthListener(onChange) {
  // const app = initializeApp(firebaseConfig)
  // const auth = getAuth(app)
  // onAuthStateChanged(auth, (fbUser) => {
  //   if (!fbUser) return onChange(null)
  //   const user = { id: fbUser.uid, email: fbUser.email, isAdmin: false } // add claims if you use them
  //   onChange(user)
  // })
}

export async function loginWithEmailPassword({ email, password }) {
  // const { user } = await signInWithEmailAndPassword(getAuth(), email, password)
  // return { id: user.uid, email: user.email, isAdmin: false }
  throw new Error('Firebase auth not wired yet')
}

export async function registerWithEmailPassword({ email, password }) {
  // const { user } = await createUserWithEmailAndPassword(getAuth(), email, password)
  // return { id: user.uid, email: user.email, isAdmin: false }
  throw new Error('Firebase auth not wired yet')
}

export async function logoutUser() {
  // await signOut(getAuth())
  throw new Error('Firebase auth not wired yet')
}

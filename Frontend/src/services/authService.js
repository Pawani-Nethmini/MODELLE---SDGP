import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

// Sign up with email and password
export const signup = async (email, password, role = "customer") => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create user document in Firestore
  await setDoc(doc(db, "users", user.uid), {
    email,
    role,
    createdAt: new Date(),
  });

  return user;
};

// Login with email and password
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Logout
export const logout = async () => {
  await signOut(auth);
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Get user role from Firestore
export const getUserRole = async (uid) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) {
    return docSnap.data().role;
  }
  return null;
};

// Subscribe to auth state changes
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};
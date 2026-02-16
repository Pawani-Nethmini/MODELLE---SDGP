// global user state
// provide user, role, isAuthenticated
// used by RoleGuard, ShowroomPage and UploadToShowroomCTA

import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "./useAuth";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
      } else {
        setCurrentUser(null);
        setRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, role, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

import React, { useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../Firebase/firebase.config";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthContext = React.createContext();

export const useAuth = function () {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [currentuser, setCurrentuser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setCurrentuser(user);
    });
    return unsubscribe;
  }, []);

  //signup
  const signup = async function (email, password, username) {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
    const currentuser = auth.currentUser;
    setCurrentuser({ ...currentuser });
    return result;
  };

  //login
  const login = async function (email, password) {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password);
  };

  //google login
  const googleLogin = async function () {
    setLoading(true);
    return await signInWithPopup(auth, googleProvider);
  };

  //logout
  const logout = async function () {
    setLoading(true);
    return await signOut(auth);
  };

  const value = {
    currentuser,
    loading,
    signup,
    login,
    googleLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

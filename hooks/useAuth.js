import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD5yPQkcvByrqg-3gPMRzS6jSnJ9B6FKn0",
  authDomain: "tinderkagenou.firebaseapp.com",
  projectId: "tinderkagenou",
  storageBucket: "tinderkagenou.firebasestorage.app",
  messagingSenderId: "502685258605",
  appId: "1:502685258605:ios:b27bc9f7fb75a1d9644064",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '502685258605-9e3qnhag2ktiqpn2n7eso3lb1e7tv6fr.apps.googleusercontent.com',
  });

  // Handle Google Sign-In response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setUser({
        email: authentication?.accessToken,
      });
    }
  }, [response]);

  // Google Sign-In
  const signInWithGoogle = async () => {
    await promptAsync();
  };

  // Email/Password Sign-In
  const signInWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  // Email/Password Sign-Up
  const signUpWithEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithEmail, signUpWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export default function useAuth() {
  return useContext(AuthContext);
}
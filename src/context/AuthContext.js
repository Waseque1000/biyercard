"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  isFirebaseConfigured,
} from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null);

const DEMO_USER_KEY = "wedly_demo_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Check if demo user is stored in localStorage
    if (typeof window !== "undefined") {
      const storedDemo = localStorage.getItem(DEMO_USER_KEY);
      if (storedDemo) {
        try {
          const parsed = JSON.parse(storedDemo);
          setUser(parsed);
          setIsDemo(true);
          setLoading(false);
          return;
        } catch {
          // ignore
        }
      }
    }

    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Guest",
          photoURL: firebaseUser.photoURL || null,
          token,
        };
        setUser(userData);
        setIsDemo(false);

        // Sync with backend profile
        try {
          await fetch("/api/auth/sync-profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              fullName: userData.displayName,
              email: userData.email,
              avatarUrl: userData.photoURL,
            }),
          });
        } catch (e) {
          console.warn("Profile sync warning:", e);
        }
      } else {
        // If not demo user, clear state
        const storedDemo = localStorage.getItem(DEMO_USER_KEY);
        if (!storedDemo) {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (!isFirebaseConfigured || !auth) {
      // Demo login
      return enableDemoUser(email);
    }
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  };

  const register = async (email, password, displayName) => {
    if (!isFirebaseConfigured || !auth) {
      return enableDemoUser(email, displayName);
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && cred.user) {
      await updateProfile(cred.user, { displayName });
    }
    return cred.user;
  };

  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth) {
      return enableDemoUser("google.user@example.com", "Google Demo User");
    }
    const cred = await signInWithPopup(auth, googleProvider);
    return cred.user;
  };

  const logout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(DEMO_USER_KEY);
    }
    setIsDemo(false);
    setUser(null);
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
  };

  const resetPassword = async (email) => {
    if (!isFirebaseConfigured || !auth) {
      return true;
    }
    return sendPasswordResetEmail(auth, email);
  };

  const enableDemoUser = (customEmail = null, customName = null) => {
    const demoUser = {
      uid: "demo-user-wedly",
      email: customEmail || "demo@wedly.ai",
      displayName: customName || "Ayesha & Rafid (Demo)",
      photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      token: "demo-token-demo-user-wedly",
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    }
    setUser(demoUser);
    setIsDemo(true);
    setLoading(false);
    return demoUser;
  };

  const getIdToken = async () => {
    if (isDemo && user) {
      return `demo-token-${user.uid}`;
    }
    if (auth && auth.currentUser) {
      return await auth.currentUser.getIdToken();
    }
    return user?.token || null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isDemo,
        isFirebaseConfigured,
        login,
        register,
        loginWithGoogle,
        logout,
        resetPassword,
        enableDemoUser,
        getIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

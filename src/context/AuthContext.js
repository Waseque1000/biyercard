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
import { claimGuestInvitationsForUser } from "@/lib/localInvitations";

const AuthContext = createContext(null);

const DEMO_USER_KEY = "wedly_demo_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      if (typeof window !== "undefined") {
        const storedDemo = localStorage.getItem(DEMO_USER_KEY);
        if (storedDemo) {
          try {
            setUser(JSON.parse(storedDemo));
            setIsDemo(true);
          } catch {
            // ignore
          }
        }
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        if (typeof window !== "undefined") {
          localStorage.removeItem(DEMO_USER_KEY);
        }
        const token = await firebaseUser.getIdToken();
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName:
            firebaseUser.displayName ||
            firebaseUser.email?.split("@")[0] ||
            "Wedly Member",
          photoURL: firebaseUser.photoURL || null,
          token,
        };
        setUser(userData);
        setIsDemo(false);

        // Claim any guest cards created before login/registration
        const claimed = claimGuestInvitationsForUser(firebaseUser.uid);

        // Sync with backend profile and sync claimed invitations
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

          for (const inv of claimed.slice(0, 10)) {
            if (inv && inv.design_json) {
              await fetch("/api/invitations", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(inv),
              }).catch(() => {});
            }
          }
        } catch (e) {
          console.warn("Profile sync warning:", e);
        }
      } else {
        // Check if demo user is explicitly active
        const storedDemo =
          typeof window !== "undefined"
            ? localStorage.getItem(DEMO_USER_KEY)
            : null;
        if (storedDemo) {
          try {
            setUser(JSON.parse(storedDemo));
            setIsDemo(true);
          } catch {
            setUser(null);
            setIsDemo(false);
          }
        } else {
          setUser(null);
          setIsDemo(false);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(DEMO_USER_KEY);
    }
    if (!isFirebaseConfigured || !auth) {
      return enableDemoUser(email);
    }
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const token = await cred.user.getIdToken();
    const userData = {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName:
        cred.user.displayName || cred.user.email?.split("@")[0] || "Wedly Member",
      photoURL: cred.user.photoURL || null,
      token,
    };
    setUser(userData);
    setIsDemo(false);
    return userData;
  };

  const register = async (email, password, displayName) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(DEMO_USER_KEY);
    }
    if (!isFirebaseConfigured || !auth) {
      return enableDemoUser(email, displayName);
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && cred.user) {
      await updateProfile(cred.user, { displayName });
    }
    const token = await cred.user.getIdToken(true);
    const userData = {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: displayName || cred.user.email?.split("@")[0] || "Wedly Member",
      photoURL: cred.user.photoURL || null,
      token,
    };
    setUser(userData);
    setIsDemo(false);
    return userData;
  };

  const loginWithGoogle = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(DEMO_USER_KEY);
    }
    if (!isFirebaseConfigured || !auth) {
      return enableDemoUser("google.user@example.com", "Google Demo User");
    }
    const cred = await signInWithPopup(auth, googleProvider);
    const token = await cred.user.getIdToken();
    const userData = {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName:
        cred.user.displayName || cred.user.email?.split("@")[0] || "Wedly Member",
      photoURL: cred.user.photoURL || null,
      token,
    };
    setUser(userData);
    setIsDemo(false);
    return userData;
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

  const updateUserProfile = async (newDisplayName) => {
    if (auth && auth.currentUser && newDisplayName) {
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
    }
    setUser((prev) =>
      prev ? { ...prev, displayName: newDisplayName } : prev
    );
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
        updateUserProfile,
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

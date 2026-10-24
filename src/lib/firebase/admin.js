import { getApps, getApp, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const isServer = typeof window === "undefined";

function initFirebaseAdmin() {
  if (!isServer) return null;

  try {
    const apps = getApps();
    if (apps && apps.length > 0) {
      return getApp();
    }

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (projectId && privateKey && clientEmail) {
      return initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    }

    if (projectId && projectId !== "wedly-ai") {
      return initializeApp({ projectId });
    }
  } catch (e) {
    console.warn("Firebase Admin modular init warning:", e.message);
  }

  return null;
}

const adminApp = initFirebaseAdmin();

/**
 * Verifies a Firebase ID token extracted from the Authorization: Bearer <token> header.
 * If credentials are not configured or token is a valid demo token, returns the parsed UID.
 */
export async function verifyAuthToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Missing or invalid authorization header", uid: null };
  }

  const token = authHeader.split("Bearer ")[1]?.trim();
  if (!token) {
    return { error: "Token is empty", uid: null };
  }

  // Handle local demo user token
  if (token.startsWith("demo-token-")) {
    const demoUid = token.replace("demo-token-", "") || "demo-user-123";
    return {
      uid: demoUid,
      email: `${demoUid}@wedly.ai`,
      name: "Demo Wedding Planner",
      isDemo: true,
    };
  }

  if (adminApp) {
    try {
      const auth = getAuth(adminApp);
      const decodedToken = await auth.verifyIdToken(token);
      return {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || decodedToken.email?.split("@")[0],
        isDemo: false,
      };
    } catch (err) {
      console.error("Firebase token verification error:", err.message);
      return { error: "Unauthorized: Invalid token", uid: null };
    }
  }

  // In development without Firebase credentials, allow seamless development if token provided
  if (process.env.NODE_ENV !== "production") {
    return {
      uid: "dev-user-uid",
      email: "dev@wedly.ai",
      name: "Development User",
      isDemo: true,
    };
  }

  return { error: "Firebase Admin is not configured", uid: null };
}

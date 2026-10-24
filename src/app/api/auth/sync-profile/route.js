import { NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/firebase/admin";
import { upsertUserProfile } from "@/lib/supabase/server";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const authResult = await verifyAuthToken(authHeader);

    if (authResult.error || !authResult.uid) {
      return NextResponse.json(
        { error: authResult.error || "Unauthorized" },
        { status: 401 }
      );
    }

    const { fullName, email, avatarUrl } = await req.json();

    const profile = await upsertUserProfile(authResult.uid, {
      fullName: fullName || authResult.name,
      email: email || authResult.email,
      avatarUrl: avatarUrl || null,
    });

    return NextResponse.json({ success: true, profile });
  } catch (err) {
    console.error("API /api/auth/sync-profile error:", err);
    return NextResponse.json(
      { error: "Failed to sync profile", message: err.message },
      { status: 500 }
    );
  }
}

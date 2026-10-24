import { NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/firebase/admin";
import { getUserInvitations, saveInvitation } from "@/lib/supabase/server";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  const authResult = await verifyAuthToken(authHeader);

  if (authResult.error || !authResult.uid) {
    return NextResponse.json(
      { error: authResult.error || "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const invitations = await getUserInvitations(authResult.uid);
    return NextResponse.json({ success: true, data: invitations });
  } catch (err) {
    console.error("GET /api/invitations error:", err);
    return NextResponse.json(
      { error: "Failed to fetch invitations", message: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const authHeader = req.headers.get("authorization");
  const authResult = await verifyAuthToken(authHeader);
  const uid = authResult?.uid || "demo-user-guest";

  try {
    const body = await req.json();
    const saved = await saveInvitation(uid, body);
    return NextResponse.json({ success: true, data: saved });
  } catch (err) {
    console.error("POST /api/invitations error:", err);
    return NextResponse.json(
      { error: "Failed to save invitation", message: err.message },
      { status: 500 }
    );
  }
}

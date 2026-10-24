import { NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/firebase/admin";
import {
  getInvitationById,
  saveInvitation,
  deleteInvitation,
} from "@/lib/supabase/server";

export async function GET(req, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const authHeader = req.headers.get("authorization");
    let uid = null;
    if (authHeader) {
      const authResult = await verifyAuthToken(authHeader);
      uid = authResult.uid || null;
    }

    const invitation = await getInvitationById(id, uid);

    if (!invitation) {
      return NextResponse.json(
        { error: "Invitation not found or unauthorized access" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: invitation });
  } catch (err) {
    console.error("GET /api/invitations/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch invitation", message: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const authHeader = req.headers.get("authorization");
    const authResult = await verifyAuthToken(authHeader);
    const uid = authResult.uid || "demo-user-guest";

    const body = await req.json();
    const updated = await saveInvitation(uid, { ...body, id });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("PATCH /api/invitations/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to update invitation", message: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const authHeader = req.headers.get("authorization");
    const authResult = await verifyAuthToken(authHeader);

    if (!authResult.uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const success = await deleteInvitation(authResult.uid, id);
    if (!success) {
      return NextResponse.json(
        { error: "Invitation not found or unauthorized to delete" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/invitations/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to delete invitation", message: err.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { refineWeddingDesign } from "@/lib/gemini/client";
import { DesignSpecificationSchema } from "@/lib/schemas/invitationSchema";

export async function POST(req) {
  try {
    const { currentDesign, action } = await req.json();

    const validation = DesignSpecificationSchema.safeParse(currentDesign);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid current design specification" },
        { status: 400 }
      );
    }

    const updated = await refineWeddingDesign(validation.data, action);
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("API /api/regenerate-style error:", err);
    return NextResponse.json(
      { error: "Failed to refine style", message: err.message },
      { status: 500 }
    );
  }
}

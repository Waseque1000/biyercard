import { NextResponse } from "next/server";
import { generateWeddingDesign } from "@/lib/gemini/client";
import { WizardFormSchema } from "@/lib/schemas/invitationSchema";

export async function POST(req) {
  try {
    const body = await req.json();
    const validation = WizardFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid input parameters",
          details: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    const result = await generateWeddingDesign(validation.data);

    return NextResponse.json(result);
  } catch (err) {
    console.error("API /api/generate-design error:", err);
    return NextResponse.json(
      { error: "Failed to generate wedding design", message: err.message },
      { status: 500 }
    );
  }
}

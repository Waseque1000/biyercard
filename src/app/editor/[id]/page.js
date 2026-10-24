import React, { Suspense } from "react";
import InvitationEditor from "@/components/editor/InvitationEditor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Live Invitation Studio — Wedly AI",
  description: "Customize and fine-tune your bespoke wedding invitation in real time.",
};

export default async function EditorPage({ params }) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center text-[#173D32] font-serif text-lg">
          Loading Wedly Studio...
        </div>
      }
    >
      <InvitationEditor invitationId={id} />
    </Suspense>
  );
}

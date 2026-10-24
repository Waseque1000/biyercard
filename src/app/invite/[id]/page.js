import React, { Suspense } from "react";
import PublicInviteView from "@/components/public-invite/PublicInviteView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Wedding Celebration Invitation — Wedly AI",
  description: "You are cordially invited to celebrate our wedding union.",
};

export default async function PublicInvitePage({ params }) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center text-[#173D32] font-serif text-lg">
          Loading Wedding Invitation...
        </div>
      }
    >
      <PublicInviteView id={id} />
    </Suspense>
  );
}

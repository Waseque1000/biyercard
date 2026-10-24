import React from "react";
import MyInvitationsView from "@/components/dashboard/MyInvitationsView";

export const metadata = {
  title: "My Invitations — Wedly AI Atelier",
  description: "Browse, edit, duplicate, and download your wedding invitations.",
};

export default function InvitationsPage() {
  return <MyInvitationsView />;
}

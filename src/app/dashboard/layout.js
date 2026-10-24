import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export const metadata = {
  title: "Dashboard — Wedly AI Atelier",
  description: "Manage your wedding invitations, proofs, RSVPs, and stationery downloads.",
};

export default function Layout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

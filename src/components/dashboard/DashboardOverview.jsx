"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Sparkles,
  ArrowRight,
  Copy,
  Trash2,
  FileDown,
  Share2,
  Edit,
  Clock,
  Eye,
  CheckCircle,
  Plus,
  Heart,
  TrendingUp,
} from "lucide-react";
import InvitationRenderer from "@/components/invitation-templates/InvitationRenderer";
import { exportInvitationAsPdf } from "@/lib/exportUtils";
import { toast } from "sonner";

export default function DashboardOverview() {
  const router = useRouter();
  const { user, getIdToken } = useAuth();
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvitations = async () => {
    try {
      const token = await getIdToken();
      const res = await fetch("/api/invitations", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const json = await res.json();
        setInvitations(json.data || []);
      }
    } catch (e) {
      console.warn("Failed to fetch dashboard invitations:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this invitation?")) return;

    try {
      const token = await getIdToken();
      const res = await fetch(`/api/invitations/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        toast.success("Invitation deleted");
        fetchInvitations();
      }
    } catch (err) {
      toast.error("Delete failed: " + err.message);
    }
  };

  const handleDuplicate = async (inv, e) => {
    e.stopPropagation();
    try {
      const token = await getIdToken();
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: `${inv.title} (Copy)`,
          bride_name: inv.bride_name,
          groom_name: inv.groom_name,
          wedding_date: inv.wedding_date,
          venue: inv.venue,
          invitation_message: inv.invitation_message,
          language: inv.language,
          design_style: inv.design_style,
          theme: inv.theme,
          color_palette: inv.color_palette,
          design_json: inv.design_json,
          status: "draft",
        }),
      });

      if (res.ok) {
        toast.success("Invitation duplicated!");
        fetchInvitations();
      }
    } catch (err) {
      toast.error("Duplicate failed");
    }
  };

  const handleCopyLink = (id, e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/invite/${id}`;
    navigator.clipboard.writeText(url);
    toast.success("Public invitation URL copied to clipboard!");
  };

  const publishedCount = invitations.filter((i) => i.status === "published").length;
  const draftCount = invitations.filter((i) => i.status !== "published").length;

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Welcome & Solemnity Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E9DA] text-[#9A7C43] font-sans text-[10px] font-bold uppercase tracking-wider border border-[#E8E2D8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#173D32] animate-pulse" />
              Solemnity Countdown
            </span>
            <span className="text-xs text-[#173D32] font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>142 Days Until Your Wedding Day</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#173D32] tracking-tight">
            Welcome back,{" "}
            <span className="italic font-normal">
              {user?.displayName || "Sophia & David"}
            </span>
          </h1>

          <p className="font-sans text-sm text-[#77766F] leading-relaxed">
            Your bespoke stationery atelier is synchronized. Your active suites are proofed with letterpress foil simulations and real-time RSVP portals.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#173D32] hover:bg-[#285C49] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all hover:-translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>Create New Invitation</span>
          </Link>
        </div>
      </section>

      {/* 4-Bento Key Metrics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="bg-white p-6 rounded-lg border border-[#E8E2D8] shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-sans text-[10px] uppercase font-bold text-[#77766F] tracking-wider block">
                Atelier Suites
              </span>
              <span className="font-serif text-3xl text-[#173D32] mt-1 block">
                {invitations.length} {invitations.length === 1 ? "Design" : "Designs"}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FAF8F4] border border-[#E8E2D8] flex items-center justify-center text-[#173D32]">
              <Sparkles className="w-4 h-4 text-[#C6A66B]" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#FAF8F4] flex items-center justify-between text-xs text-[#77766F]">
            <span>{publishedCount} Published • {draftCount} Drafts</span>
            <Link
              href="/dashboard/invitations"
              className="text-[#285C49] font-semibold hover:underline flex items-center"
            >
              View All <ArrowRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-6 rounded-lg border border-[#E8E2D8] shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-sans text-[10px] uppercase font-bold text-[#77766F] tracking-wider block">
                Attendance Flow
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-serif text-3xl text-[#173D32]">184</span>
                <span className="text-xs text-[#77766F]">views</span>
                <span className="text-[#C6A66B] mx-1">•</span>
                <span className="font-serif text-3xl text-[#173D32]">42</span>
                <span className="text-xs text-[#77766F]">RSVPs</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FAF8F4] border border-[#E8E2D8] flex items-center justify-center text-[#285C49]">
              <TrendingUp className="w-4 h-4 text-[#285C49]" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#FAF8F4] flex items-center justify-between text-xs text-[#77766F]">
            <span>68% response velocity</span>
            <span className="text-[#285C49] font-semibold">+18 this week</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-6 rounded-lg border border-[#E8E2D8] shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-sans text-[10px] uppercase font-bold text-[#77766F] tracking-wider block">
                Moodboard Stacks
              </span>
              <span className="font-serif text-3xl text-[#173D32] mt-1 block">
                5 Curated
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FAF8F4] border border-[#E8E2D8] flex items-center justify-center text-[#C6A66B]">
              <Heart className="w-4 h-4 text-[#C6A66B]" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#FAF8F4] flex items-center justify-between text-xs text-[#77766F]">
            <span className="line-clamp-1">Emerald, Ivory, Minimal, Desi</span>
            <span className="text-[#173D32] font-semibold">Active</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-6 rounded-lg border border-[#E8E2D8] shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-sans text-[10px] uppercase font-bold text-[#77766F] tracking-wider block">
                Gemini AI Synthesis
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-serif text-3xl text-[#173D32]">12</span>
                <span className="text-xs text-[#77766F]">credits left</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FAF8F4] border border-[#E8E2D8] flex items-center justify-center text-[#9A7C43]">
              <Sparkles className="w-4 h-4 text-[#C6A66B]" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#FAF8F4] flex items-center justify-between text-xs text-[#77766F]">
            <span>Pro Tier refills in 9d</span>
            <button
              onClick={() => toast.info("Your account currently has unlimited generation credits!")}
              className="text-[#9A7C43] font-bold hover:underline"
            >
              Top Up
            </button>
          </div>
        </div>
      </section>

      {/* Main Workspace Split: Recent Invitations Grid (8 cols) + Atelier Chronicle Log (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Invitations */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#9A7C43]">
                Active Atelier Proofs
              </span>
              <h2 className="font-serif text-2xl text-[#173D32]">
                Recent Invitations Workspace
              </h2>
            </div>

            <Link
              href="/dashboard/invitations"
              className="font-sans text-xs font-semibold uppercase tracking-wider text-[#173D32] hover:text-[#285C49] flex items-center gap-1"
            >
              <span>Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="bg-white p-12 rounded-lg border border-[#E8E2D8] text-center text-[#77766F] font-serif">
              Loading your atelier proofs...
            </div>
          ) : invitations.length === 0 ? (
            /* Empty State */
            <div className="bg-white p-12 rounded-xl border border-[#E8E2D8] text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F4] border border-[#E8E2D8] flex items-center justify-center mx-auto text-[#C6A66B]">
                <Sparkles className="w-8 h-8 text-[#C6A66B]" />
              </div>
              <h3 className="font-serif text-2xl text-[#173D32]">
                No Wedding Invitations Yet
              </h3>
              <p className="font-sans text-xs text-[#77766F] max-w-sm mx-auto">
                Begin your wedding suite journey by sharing your names and choosing a signature aesthetic.
              </p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#173D32] hover:bg-[#285C49] text-white text-xs font-semibold uppercase tracking-wider shadow"
              >
                <Plus className="w-4 h-4 text-[#C6A66B]" />
                <span>Create Your First Invitation</span>
              </Link>
            </div>
          ) : (
            /* Grid of Cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {invitations.slice(0, 4).map((inv) => (
                <div
                  key={inv.id}
                  onClick={() => router.push(`/editor/${inv.id}`)}
                  className="bg-white rounded-lg p-4 border border-[#E8E2D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  {/* Card Thumbnail Preview Stage */}
                  <div className="relative w-full aspect-[4/5] rounded overflow-hidden bg-[#FAF8F4] flex items-center justify-center border border-[#E8E2D8]">
                    <div className="transform scale-[0.55] pointer-events-none origin-center">
                      <InvitationRenderer
                        design={inv.design_json}
                        showShadow={false}
                      />
                    </div>

                    <div className="absolute top-2.5 left-2.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-sans font-bold uppercase tracking-wider ${
                          inv.status === "published"
                            ? "bg-[#173D32] text-white shadow"
                            : "bg-white text-[#77766F] border border-[#E8E2D8]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            inv.status === "published"
                              ? "bg-[#C6A66B]"
                              : "bg-[#77766F]"
                          }`}
                        />
                        {inv.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>

                  {/* Card Metadata */}
                  <div className="pt-4 space-y-1">
                    <span className="font-sans text-[10px] uppercase font-bold text-[#77766F] tracking-wider block">
                      {inv.theme || "Custom Atelier"} • 5×7 in
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-[#173D32] line-clamp-1 group-hover:text-[#285C49] transition-colors">
                      {inv.title || "Wedding Invitation"}
                    </h3>
                    <p className="font-sans text-xs text-[#77766F] line-clamp-1">
                      {inv.venue || "Private Venue"}
                    </p>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 mt-3 border-t border-[#FAF8F4] flex items-center justify-between">
                    <Link
                      href={`/editor/${inv.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#173D32] hover:bg-[#285C49] text-white font-sans text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <Edit className="w-3 h-3 text-[#C6A66B]" />
                      <span>Edit Studio</span>
                    </Link>

                    <div className="flex items-center gap-1 text-[#77766F]">
                      <button
                        onClick={(e) => handleCopyLink(inv.id, e)}
                        title="Copy Public Link"
                        className="p-1.5 hover:text-[#173D32] rounded hover:bg-[#FAF8F4]"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDuplicate(inv, e)}
                        title="Duplicate"
                        className="p-1.5 hover:text-[#173D32] rounded hover:bg-[#FAF8F4]"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(inv.id, e)}
                        title="Delete"
                        className="p-1.5 hover:text-red-600 rounded hover:bg-[#FAF8F4]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Atelier Chronicle Log */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#9A7C43]">
              Chronicle & Prints
            </span>
            <h2 className="font-serif text-2xl text-[#173D32]">
              Atelier Log
            </h2>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E8E2D8] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-[#FAF8F4]">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#173D32]">
                Recent Studio Activity
              </span>
              <span className="font-sans text-[10px] text-[#77766F] uppercase">
                Synchronized
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "High-Res Print Master Exported",
                  desc: "300 DPI Vector PDF generated for letterpress proofing",
                  time: "2 hours ago",
                  icon: FileDown,
                },
                {
                  title: "New Guest RSVPs Received",
                  desc: "4 new attendance confirmations logged to guestlist",
                  time: "5 hours ago",
                  icon: CheckCircle,
                },
                {
                  title: "Gemini AI Synthesis Iteration",
                  desc: "Regenerated palette & typography with cultural nuance",
                  time: "Yesterday",
                  icon: Sparkles,
                },
                {
                  title: "Stationery Studio Initialized",
                  desc: "Custom font ligatures and deckled border calibrated",
                  time: "3 days ago",
                  icon: Clock,
                },
              ].map((ev, i) => {
                const IconComp = ev.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#FAF8F4] border border-[#E8E2D8] flex items-center justify-center text-[#173D32] shrink-0 mt-0.5">
                      <IconComp className="w-3.5 h-3.5 text-[#C6A66B]" />
                    </div>
                    <div>
                      <span className="font-sans text-xs font-semibold text-[#173D32] block leading-snug">
                        {ev.title}
                      </span>
                      <span className="font-sans text-[11px] text-[#77766F] block mt-0.5">
                        {ev.desc}
                      </span>
                      <span className="font-sans text-[10px] text-[#C6A66B] font-medium block mt-1">
                        {ev.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

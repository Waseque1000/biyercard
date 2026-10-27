"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  CalendarPlus,
  Download,
  Lock,
} from "lucide-react";
import InvitationRenderer from "@/components/invitation-templates/InvitationRenderer";
import { exportInvitationAsPdf } from "@/lib/exportUtils";
import { getLocalInvitationById } from "@/lib/localInvitations";
import { toast } from "sonner";

export default function PublicInviteView({ id }) {
  const router = useRouter();
  const { user } = useAuth();
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const autoDownloadRef = useRef(false);
  const [rsvpState, setRsvpState] = useState({
    name: "",
    attending: "yes",
    guests: "1",
    notes: "",
    submitted: false,
  });

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    async function fetchInvitation() {
      try {
        const localSaved = getLocalInvitationById(id);
        if (localSaved?.design_json) {
          setInvitation(localSaved);
          setLoading(false);
          return;
        }
        const res = await fetch(`/api/invitations/${id}`);
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setInvitation(json.data);
            return;
          }
        }
      } catch (e) {
        console.warn("Public invite fetch error:", e);
      } finally {
        setLoading(false);
      }

      // Fallback default preview if draft
      setInvitation({
        title: "Ayesha & Rafid Wedding",
        status: "published",
        design_json: {
          template: "emerald-royal",
          language: "en",
          culturalStyle: "classic",
          palette: {
            name: "Emerald & Gold",
            background: "#FAF8F4",
            primary: "#173D32",
            secondary: "#285C49",
            accent: "#C6A66B",
            cardBg: "#FFFFFF",
            textPrimary: "#173D32",
            textMuted: "#6B756E",
            borderColor: "#E8E2D8",
          },
          typography: { headingFont: "Playfair Display", bodyFont: "DM Sans" },
          decorations: { hasFloralCorners: true, hasGoldBorder: true, hasWaxSeal: true, monogram: "A&R" },
          content: {
            title: "THE HONOUR OF YOUR PRESENCE",
            subtitle: "Together with our families",
            brideName: "Ayesha Rahman",
            groomName: "Rafid Chowdhury",
            weddingDate: "Friday, November 26, 2027",
            weddingTime: "6:00 PM",
            venue: "The Palace Grand Ballroom",
            city: "Dhaka, Bangladesh",
            message: "Request the pleasure of your company to celebrate our holy union.",
            rsvpDetails: "RSVP to family by November 1st",
          },
        },
      });
      setLoading(false);
    }

    fetchInvitation();
  }, [id]);

  // Calculate countdown
  useEffect(() => {
    if (!invitation?.design_json?.content?.weddingDate) return;
    const target = new Date(invitation.design_json.content.weddingDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [invitation]);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setRsvpState((prev) => ({ ...prev, submitted: true }));
    toast.success("RSVP received! Thank you for celebrating with us.");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleDownloadCard = async () => {
    if (!user) {
      toast.info("Please Log In or Register to download the final card.");
      router.push(
        `/login?redirect=${encodeURIComponent(
          `/invite/${id}?download=pdf`
        )}&reason=download`
      );
      return;
    }

    try {
      toast.loading("Preparing high-resolution PDF card...", { id: "pub-dl" });
      const el = document.getElementById("wedly-invitation-card");
      await exportInvitationAsPdf(
        el,
        `${(invitation?.title || "wedding-invitation")
          .replace(/\s+/g, "-")
          .toLowerCase()}.pdf`,
        invitation?.design_json?.orientation || "portrait"
      );
      toast.success("Final card PDF downloaded!", { id: "pub-dl" });
    } catch (e) {
      toast.error("Download failed: " + e.message, { id: "pub-dl" });
    }
  };

  useEffect(() => {
    if (!user || !invitation || autoDownloadRef.current) return;
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("download") === "pdf") {
      autoDownloadRef.current = true;
      window.history.replaceState({}, "", window.location.pathname);
      setTimeout(() => {
        handleDownloadCard();
      }, 600);
    }
  }, [user, invitation]);

  const getGoogleCalendarUrl = () => {
    if (!invitation?.design_json?.content) return "#";
    const c = invitation.design_json.content;
    const text = encodeURIComponent(`${c.brideName} & ${c.groomName} Wedding Celebration`);
    const details = encodeURIComponent(c.message || "Wedding ceremony and celebration.");
    const location = encodeURIComponent(`${c.venue}, ${c.city}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&location=${location}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center text-[#173D32] font-serif text-lg">
        Loading Wedding Invitation...
      </div>
    );
  }

  const content = invitation?.design_json?.content;

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col items-center justify-between text-[#252923] relative overflow-x-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C6A66B]/10 blur-[120px] pointer-events-none rounded-full" />

      <header className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-[#173D32] flex items-center justify-center text-[#C6A66B] shadow-sm">
            <span className="font-serif italic font-bold text-sm">W</span>
          </div>
          <span className="font-serif text-base text-[#173D32] font-semibold">
            Wedly AI
          </span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8E2D8] text-xs font-semibold text-[#173D32] hover:bg-[#F1E9DA] shadow-sm transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-[#C6A66B]" />
          <span>Share Invitation</span>
        </button>
      </header>

      <main className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center space-y-12 z-10">
        {timeLeft.days > 0 && (
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#E8E2D8] shadow-sm text-xs font-sans">
            <Clock className="w-4 h-4 text-[#C6A66B]" />
            <span className="text-[#77766F] uppercase tracking-wider font-semibold">
              Celebration Countdown:
            </span>
            <span className="text-[#173D32] font-bold">
              {timeLeft.days} days, {timeLeft.hours} hrs, {timeLeft.minutes} mins
            </span>
          </div>
        )}

        <div className="transform scale-[0.88] sm:scale-100 transition-transform origin-center my-2 animate-in zoom-in-95 duration-500">
          <InvitationRenderer design={invitation.design_json} />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={handleDownloadCard}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#173D32] hover:bg-[#285C49] text-white text-xs font-semibold uppercase tracking-wider shadow transition-colors"
          >
            {!user ? (
              <Lock className="w-4 h-4 text-[#C6A66B]" />
            ) : (
              <Download className="w-4 h-4 text-[#C6A66B]" />
            )}
            <span>Download Final Card</span>
          </button>

          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white hover:bg-[#F1E9DA] text-[#173D32] border border-[#E8E2D8] text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors"
          >
            <CalendarPlus className="w-4 h-4 text-[#C6A66B]" />
            <span>Add to Calendar</span>
          </a>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(
              `${content?.venue || ""} ${content?.city || ""}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white hover:bg-[#F1E9DA] text-[#173D32] border border-[#E8E2D8] text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#C6A66B]" />
            <span>View Venue on Map</span>
          </a>
        </div>

        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl border border-[#E8E2D8] shadow-md space-y-4">
          <div className="text-center space-y-1">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#9A7C43]">
              Ceremony Attendance
            </span>
            <h3 className="font-serif text-2xl text-[#173D32]">Online RSVP</h3>
            <p className="font-sans text-xs text-[#77766F]">
              Kindly reply by your earliest convenience to assist in ceremonial seating.
            </p>
          </div>

          {rsvpState.submitted ? (
            <div className="py-6 flex flex-col items-center text-center space-y-2 bg-[#FAF8F4] rounded-lg border border-[#E8E2D8]">
              <CheckCircle2 className="w-8 h-8 text-[#285C49]" />
              <h4 className="font-serif text-lg font-semibold text-[#173D32]">
                Thank you, {rsvpState.name}!
              </h4>
              <p className="font-sans text-xs text-[#77766F] max-w-xs">
                Your response has been registered with the hosts. We look forward to celebrating together.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="font-sans text-xs font-semibold text-[#173D32]">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={rsvpState.name}
                  onChange={(e) =>
                    setRsvpState({ ...rsvpState, name: e.target.value })
                  }
                  placeholder="e.g. Imran & Family"
                  className="w-full px-3.5 py-2 rounded border border-[#E8E2D8] text-sm text-[#252923] bg-[#FAF8F4] focus:outline-none focus:border-[#C6A66B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans text-xs font-semibold text-[#173D32]">
                  Will you attend?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setRsvpState({ ...rsvpState, attending: "yes" })
                    }
                    className={`py-2 rounded text-xs font-semibold uppercase tracking-wider border ${
                      rsvpState.attending === "yes"
                        ? "bg-[#173D32] text-white border-[#173D32]"
                        : "bg-[#FAF8F4] text-[#252923] border-[#E8E2D8]"
                    }`}
                  >
                    Joyfully Accept
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setRsvpState({ ...rsvpState, attending: "no" })
                    }
                    className={`py-2 rounded text-xs font-semibold uppercase tracking-wider border ${
                      rsvpState.attending === "no"
                        ? "bg-[#173D32] text-white border-[#173D32]"
                        : "bg-[#FAF8F4] text-[#252923] border-[#E8E2D8]"
                    }`}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {rsvpState.attending === "yes" && (
                <div className="space-y-1">
                  <label className="font-sans text-xs font-semibold text-[#173D32]">
                    Number of Guests
                  </label>
                  <select
                    value={rsvpState.guests}
                    onChange={(e) =>
                      setRsvpState({ ...rsvpState, guests: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded border border-[#E8E2D8] text-sm text-[#252923] bg-[#FAF8F4] focus:outline-none focus:border-[#C6A66B]"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4+ Guests (Family)</option>
                  </select>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-sans text-xs font-semibold text-[#173D32]">
                  Warm Wishes / Dietary Notes
                </label>
                <textarea
                  rows={2}
                  value={rsvpState.notes}
                  onChange={(e) =>
                    setRsvpState({ ...rsvpState, notes: e.target.value })
                  }
                  placeholder="Blessings or dietary preferences..."
                  className="w-full px-3.5 py-2 rounded border border-[#E8E2D8] text-xs text-[#252923] bg-[#FAF8F4] focus:outline-none focus:border-[#C6A66B] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded bg-[#173D32] hover:bg-[#285C49] text-white font-sans text-xs font-bold uppercase tracking-widest shadow transition-colors"
              >
                Submit RSVP Response
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="w-full py-8 text-center text-xs text-[#77766F] z-10 border-t border-[#E8E2D8] bg-white">
        <div className="flex items-center justify-center gap-1.5">
          <span>Created with</span>
          <Link
            href="/"
            className="font-serif font-bold text-[#173D32] hover:underline"
          >
            Wedly AI Atelier
          </Link>
          <span>• AI-Powered Wedding Stationery</span>
        </div>
      </footer>
    </div>
  );
}

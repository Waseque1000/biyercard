"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Grid,
  List,
  Plus,
  Share2,
  Edit,
  Copy,
  Trash2,
  ExternalLink,
  Sparkles,
  FileDown,
  Calendar,
  Download,
  Lock,
} from "lucide-react";
import InvitationRenderer from "@/components/invitation-templates/InvitationRenderer";
import {
  getLocalInvitations,
  deleteLocalInvitation,
  saveLocalInvitation,
  mergeInvitationsLists,
} from "@/lib/localInvitations";
import { toast } from "sonner";

export default function MyInvitationsView() {
  const router = useRouter();
  const { user, getIdToken } = useAuth();
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'published' | 'draft'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

  const fetchInvitations = async () => {
    const localCards = getLocalInvitations(user?.uid || null);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/invitations", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const json = await res.json();
        setInvitations(mergeInvitationsLists(json.data || [], localCards));
        return;
      }
    } catch (e) {
      console.warn("My invitations fetch error:", e);
    } finally {
      setLoading(false);
    }
    setInvitations(localCards);
  };

  useEffect(() => {
    fetchInvitations();
  }, [user]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this invitation?")) return;

    deleteLocalInvitation(id);
    try {
      const token = await getIdToken();
      await fetch(`/api/invitations/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch (err) {
      // ignore
    }
    toast.success("Invitation removed.");
    fetchInvitations();
  };

  const handleDuplicate = async (inv, e) => {
    e.stopPropagation();
    const copyId = crypto.randomUUID();
    const copyPayload = {
      ...inv,
      id: copyId,
      title: `${inv.title} (Copy)`,
      status: "draft",
    };
    saveLocalInvitation(copyPayload, user?.uid || null);
    try {
      const token = await getIdToken();
      await fetch("/api/invitations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(copyPayload),
      });
    } catch (err) {
      // saved locally
    }
    toast.success("Invitation duplicated.");
    fetchInvitations();
  };

  const handleDownloadCard = (inv, e) => {
    e.stopPropagation();
    if (!user) {
      toast.info("Please Log In or Register to download your final card.");
      router.push(
        `/login?redirect=${encodeURIComponent(
          `/editor/${inv.id}?download=pdf`
        )}&reason=download`
      );
      return;
    }
    router.push(`/editor/${inv.id}?download=pdf`);
  };

  const handleCopyLink = (id, e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/invite/${id}`;
    navigator.clipboard.writeText(url);
    toast.success("Public link copied to clipboard!");
  };

  const filtered = invitations.filter((inv) => {
    const matchesSearch =
      inv.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.bride_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.groom_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.venue?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && inv.status === "published") ||
      (statusFilter === "draft" && inv.status !== "published");

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E2D8]">
        <div>
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#9A7C43] block">
            Stationery Library
          </span>
          <h1 className="font-serif text-3xl text-[#173D32]">My Invitations</h1>
          <p className="font-sans text-xs text-[#77766F] mt-0.5">
            Manage, duplicate, publish, and download your wedding invitation suites.
          </p>
        </div>

        <Link
          href="/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#173D32] hover:bg-[#285C49] text-white text-xs font-semibold uppercase tracking-wider shadow transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C6A66B]" />
          <span>New Invitation</span>
        </Link>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg border border-[#E8E2D8] shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#77766F] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, couple, venue..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded border border-[#E8E2D8] text-xs text-[#252923] bg-[#FAF8F4] focus:outline-none focus:border-[#C6A66B]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1 bg-[#FAF8F4] p-1 rounded border border-[#E8E2D8]">
            {["all", "published", "draft"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                  statusFilter === st
                    ? "bg-white text-[#173D32] shadow-sm"
                    : "text-[#77766F] hover:text-[#173D32]"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Grid / List Switcher */}
          <div className="flex items-center gap-1 bg-[#FAF8F4] p-1 rounded border border-[#E8E2D8]">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-[#173D32] shadow-sm"
                  : "text-[#77766F]"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "list"
                  ? "bg-white text-[#173D32] shadow-sm"
                  : "text-[#77766F]"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Invitations List / Grid */}
      {loading ? (
        <div className="bg-white p-12 rounded-lg border border-[#E8E2D8] text-center text-[#77766F] font-serif">
          Loading invitations...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-[#E8E2D8] text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#FAF8F4] border border-[#E8E2D8] flex items-center justify-center mx-auto text-[#C6A66B]">
            <Sparkles className="w-7 h-7 text-[#C6A66B]" />
          </div>
          <h3 className="font-serif text-2xl text-[#173D32]">
            No Matching Invitations Found
          </h3>
          <p className="font-sans text-xs text-[#77766F] max-w-sm mx-auto">
            {searchQuery
              ? "Try adjusting your search query or status filter."
              : "You haven't crafted any wedding invitations yet."}
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#173D32] hover:bg-[#285C49] text-white text-xs font-semibold uppercase tracking-wider shadow"
          >
            <Plus className="w-4 h-4 text-[#C6A66B]" />
            <span>Create An Invitation</span>
          </Link>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inv) => (
            <div
              key={inv.id}
              onClick={() => router.push(`/editor/${inv.id}`)}
              className="bg-white rounded-lg p-5 border border-[#E8E2D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="relative w-full aspect-[4/5] rounded overflow-hidden bg-[#FAF8F4] flex items-center justify-center border border-[#E8E2D8]">
                <div className="transform scale-[0.6] pointer-events-none origin-center">
                  <InvitationRenderer
                    design={inv.design_json}
                    showShadow={false}
                  />
                </div>
                <div className="absolute top-3 left-3">
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

              <div className="pt-4 space-y-1">
                <span className="font-sans text-[10px] uppercase font-bold text-[#77766F] tracking-wider block">
                  {inv.theme || "Custom Atelier"} • 5×7 in
                </span>
                <h3 className="font-serif text-lg font-semibold text-[#173D32] line-clamp-1 group-hover:text-[#285C49]">
                  {inv.title || "Wedding Invitation"}
                </h3>
                <p className="font-sans text-xs text-[#77766F] line-clamp-1">
                  {inv.venue || "Private Venue"}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#FAF8F4] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/editor/${inv.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#173D32] hover:bg-[#285C49] text-white font-sans text-xs font-semibold uppercase tracking-wider"
                  >
                    <Edit className="w-3 h-3 text-[#C6A66B]" />
                    <span>Edit</span>
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => handleDownloadCard(inv, e)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#FAF8F4] hover:bg-[#F1E9DA] text-[#173D32] border border-[#E8E2D8] font-sans text-xs font-semibold uppercase tracking-wider"
                  >
                    {!user ? (
                      <Lock className="w-3 h-3 text-[#C6A66B]" />
                    ) : (
                      <Download className="w-3 h-3 text-[#C6A66B]" />
                    )}
                    <span>Download</span>
                  </button>
                </div>

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
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-lg border border-[#E8E2D8] shadow-sm divide-y divide-[#E8E2D8] overflow-hidden">
          {filtered.map((inv) => (
            <div
              key={inv.id}
              onClick={() => router.push(`/editor/${inv.id}`)}
              className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#FAF8F4] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-16 rounded bg-[#F1E9DA] border border-[#E8E2D8] flex items-center justify-center font-serif text-sm font-bold text-[#173D32] shrink-0">
                  5×7
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#173D32]">
                    {inv.title || "Wedding Invitation"}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#77766F] mt-1">
                    <span>{inv.bride_name} & {inv.groom_name}</span>
                    <span>•</span>
                    <span>{inv.wedding_date}</span>
                    <span>•</span>
                    <span
                      className={`font-semibold uppercase text-[10px] ${
                        inv.status === "published"
                          ? "text-[#285C49]"
                          : "text-[#77766F]"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/editor/${inv.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1.5 rounded bg-[#173D32] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#285C49]"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={(e) => handleDownloadCard(inv, e)}
                  className="px-3 py-1.5 rounded bg-[#FAF8F4] border border-[#E8E2D8] text-[#173D32] text-xs font-semibold uppercase tracking-wider hover:bg-[#F1E9DA] flex items-center gap-1"
                >
                  {!user ? (
                    <Lock className="w-3 h-3 text-[#C6A66B]" />
                  ) : (
                    <Download className="w-3 h-3 text-[#C6A66B]" />
                  )}
                  <span>Download</span>
                </button>
                <button
                  onClick={(e) => handleCopyLink(inv.id, e)}
                  title="Copy Link"
                  className="p-2 text-[#77766F] hover:text-[#173D32]"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDelete(inv.id, e)}
                  title="Delete"
                  className="p-2 text-[#77766F] hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

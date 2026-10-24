"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Shield, Save, LogOut, Trash2, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

export default function SettingsView() {
  const router = useRouter();
  const { user, logout, getIdToken } = useAuth();

  const [displayName, setDisplayName] = useState(user?.displayName || "Ayesha & Rafid");
  const [preferredLanguage, setPreferredLanguage] = useState("en");
  const [preferredStyle, setPreferredStyle] = useState("luxury");
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = await getIdToken();
      await fetch("/api/auth/sync-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || "demo-token-user"}`,
        },
        body: JSON.stringify({
          fullName: displayName,
          email: user?.email,
        }),
      });

      setSaved(true);
      toast.success("Settings saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      toast.error("Failed to save settings");
    }
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure? This will permanently delete your account and all saved invitations.")) {
      logout();
      toast.success("Account deleted.");
      router.push("/");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="pb-3 border-b border-[#E8E2D8]">
        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#9A7C43] block">
          Studio Preferences
        </span>
        <h1 className="font-serif text-3xl text-[#173D32]">Account & Settings</h1>
        <p className="font-sans text-xs text-[#77766F] mt-0.5">
          Manage your personal details, language preferences, and security options.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Card */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E8E2D8] shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-[#FAF8F4]">
            <User className="w-5 h-5 text-[#C6A66B]" />
            <h3 className="font-serif text-xl text-[#173D32]">Profile Information</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#173D32] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
              {displayName?.[0] || "U"}
            </div>
            <div>
              <span className="font-sans text-sm font-semibold text-[#173D32] block">
                {displayName}
              </span>
              <span className="font-sans text-xs text-[#77766F]">
                {user?.email || "user@wedly.ai"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <label className="font-sans text-xs font-semibold text-[#173D32]">
                Couple Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] bg-[#FAF8F4]/50 focus:outline-none focus:border-[#C6A66B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-sans text-xs font-semibold text-[#173D32]">
                Registered Email
              </label>
              <input
                type="email"
                disabled
                value={user?.email || "user@wedly.ai"}
                className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#77766F] bg-[#FAF8F4] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E8E2D8] shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-[#FAF8F4]">
            <Sparkles className="w-5 h-5 text-[#C6A66B]" />
            <h3 className="font-serif text-xl text-[#173D32]">Studio Preferences</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="font-sans text-xs font-semibold text-[#173D32]">
                Default Language
              </label>
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] bg-[#FAF8F4]"
              >
                <option value="en">English (Default)</option>
                <option value="bn">বাংলা (Bangla)</option>
                <option value="bilingual">Bilingual (English + বাংলা)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-sans text-xs font-semibold text-[#173D32]">
                Default Design Archetype
              </label>
              <select
                value={preferredStyle}
                onChange={(e) => setPreferredStyle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] bg-[#FAF8F4]"
              >
                <option value="luxury">Luxury Royal (Emerald & Gold)</option>
                <option value="floral">Floral & Romantic (Ivory & Sage)</option>
                <option value="minimalist">Modern Minimal (Editorial)</option>
                <option value="traditional">Traditional Celebration (Desi / Islamic)</option>
                <option value="blush">Romantic Blush (Rose & Vellum)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions Save & Danger Zone */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#173D32] hover:bg-[#285C49] text-white text-xs font-semibold uppercase tracking-wider shadow transition-colors"
          >
            {saved ? <Check className="w-4 h-4 text-[#C6A66B]" /> : <Save className="w-4 h-4 text-[#C6A66B]" />}
            <span>{saved ? "Saved Changes" : "Save Changes"}</span>
          </button>

          <button
            type="button"
            onClick={handleDeleteAccount}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Account & Data</span>
          </button>
        </div>
      </form>
    </div>
  );
}

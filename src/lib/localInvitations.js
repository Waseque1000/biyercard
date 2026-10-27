"use client";

const STORAGE_KEY = "wedly_saved_invitations_v1";

export function getLocalInvitations(uid = null) {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(all)) return [];
    if (!uid) return all;
    return all.filter(
      (item) =>
        !item.user_id ||
        item.user_id === uid ||
        item.user_id === "demo-user-guest" ||
        item.user_id?.startsWith("demo-")
    );
  } catch (err) {
    console.warn("Failed to read local invitations:", err);
    return [];
  }
}

export function getLocalInvitationById(id) {
  if (typeof window === "undefined" || !id) return null;
  try {
    const all = getLocalInvitations();
    return all.find((item) => item.id === id) || null;
  } catch {
    return null;
  }
}

export function saveLocalInvitation(invitation, uid = null) {
  if (typeof window === "undefined" || !invitation || !invitation.id) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(all) ? all : [];

    const existingIdx = list.findIndex((item) => item.id === invitation.id);
    const now = new Date().toISOString();

    const record = {
      ...(existingIdx >= 0 ? list[existingIdx] : {}),
      ...invitation,
      user_id: uid || invitation.user_id || "demo-user-guest",
      updated_at: now,
      created_at:
        existingIdx >= 0
          ? list[existingIdx].created_at || now
          : invitation.created_at || now,
    };

    if (existingIdx >= 0) {
      list[existingIdx] = record;
    } else {
      list.unshift(record);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 50)));
    return record;
  } catch (err) {
    console.warn("Failed to save local invitation:", err);
    return null;
  }
}

export function deleteLocalInvitation(id) {
  if (typeof window === "undefined" || !id) return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(all)) return false;
    const filtered = all.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    sessionStorage.removeItem(`wedly_draft_${id}`);
    return true;
  } catch {
    return false;
  }
}

export function claimGuestInvitationsForUser(uid) {
  if (typeof window === "undefined" || !uid) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(all)) return [];

    let updated = false;
    const next = all.map((item) => {
      if (
        !item.user_id ||
        item.user_id === "demo-user-guest" ||
        item.user_id?.startsWith("demo-")
      ) {
        updated = true;
        return { ...item, user_id: uid, updated_at: new Date().toISOString() };
      }
      return item;
    });

    if (updated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
    return next.filter((item) => item.user_id === uid);
  } catch {
    return [];
  }
}

export function mergeInvitationsLists(remoteList = [], localList = []) {
  const map = new Map();
  for (const item of localList) {
    if (item && item.id) {
      map.set(item.id, item);
    }
  }
  for (const item of remoteList) {
    if (item && item.id) {
      const existing = map.get(item.id);
      if (
        !existing ||
        new Date(item.updated_at || 0) >= new Date(existing.updated_at || 0)
      ) {
        map.set(item.id, { ...existing, ...item });
      }
    }
  }
  return Array.from(map.values()).sort(
    (a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0)
  );
}


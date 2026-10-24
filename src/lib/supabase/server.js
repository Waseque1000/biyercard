import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isServerSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseServiceKey &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("placeholder")
);

export function getSupabaseServerClient() {
  if (!isServerSupabaseConfigured) {
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// In-memory development store for when environment variables are not yet configured
// This allows local preview without breaking before credentials are provided
const devStore = {
  profiles: new Map(),
  invitations: new Map(),
  userPreferences: new Map(),
};

export async function upsertUserProfile(uid, { fullName, email, avatarUrl }) {
  const client = getSupabaseServerClient();
  if (client) {
    const { data, error } = await client
      .from("profiles")
      .upsert(
        {
          id: uid,
          full_name: fullName,
          email,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Development fallback
  const profile = {
    id: uid,
    full_name: fullName,
    email,
    avatar_url: avatarUrl,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  devStore.profiles.set(uid, profile);
  return profile;
}

export async function getUserInvitations(uid) {
  const client = getSupabaseServerClient();
  if (client) {
    const { data, error } = await client
      .from("invitations")
      .select("*")
      .eq("user_id", uid)
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Development fallback
  const list = [];
  devStore.invitations.forEach((inv) => {
    if (inv.user_id === uid) list.push(inv);
  });
  return list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}

export async function getInvitationById(id, requestingUid = null) {
  const client = getSupabaseServerClient();
  if (client) {
    let query = client.from("invitations").select("*").eq("id", id);
    const { data, error } = await query.single();
    if (error) return null;

    // Security check: Must be owner, published, or demo/guest card
    if (
      data.status !== "published" &&
      data.user_id !== requestingUid &&
      data.user_id !== "demo-user-guest" &&
      !(requestingUid === null && data.user_id?.startsWith("demo-"))
    ) {
      return null;
    }
    return data;
  }

  const inv = devStore.invitations.get(id);
  if (!inv) return null;
  // If in dev fallback or demo user or published, allow reading
  if (
    inv.status === "published" ||
    !inv.user_id ||
    inv.user_id.startsWith("demo-") ||
    !requestingUid ||
    requestingUid.startsWith("demo-") ||
    inv.user_id === requestingUid
  ) {
    return inv;
  }
  return null;
}

export async function saveInvitation(uid, invitationData) {
  const client = getSupabaseServerClient();
  const id = invitationData.id || crypto.randomUUID();
  const effectiveUid = uid || "demo-user-guest";

  const record = {
    id,
    user_id: uid,
    title: invitationData.title || `${invitationData.bride_name || "Bride"} & ${invitationData.groom_name || "Groom"} Wedding`,
    bride_name: invitationData.bride_name,
    groom_name: invitationData.groom_name,
    wedding_date: invitationData.wedding_date,
    venue: invitationData.venue,
    invitation_message: invitationData.invitation_message || "",
    language: invitationData.language || "en",
    design_style: invitationData.design_style || "luxury",
    theme: invitationData.theme || "emerald-royal",
    color_palette: invitationData.color_palette || "emerald-gold",
    design_json: invitationData.design_json,
    thumbnail_url: invitationData.thumbnail_url || null,
    status: invitationData.status || "draft",
    updated_at: new Date().toISOString(),
  };

  if (client) {
    // If updating, verify ownership first
    if (invitationData.id) {
      const { data: existing } = await client
        .from("invitations")
        .select("user_id")
        .eq("id", invitationData.id)
        .single();

      if (existing && existing.user_id !== uid) {
        throw new Error("Unauthorized: You do not own this invitation");
      }
    }

    const { data, error } = await client
      .from("invitations")
      .upsert(record, { onConflict: "id" })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Development fallback
  if (!record.created_at) record.created_at = new Date().toISOString();
  devStore.invitations.set(id, record);
  return record;
}

export async function deleteInvitation(uid, id) {
  const client = getSupabaseServerClient();
  if (client) {
    const { error } = await client
      .from("invitations")
      .delete()
      .eq("id", id)
      .eq("user_id", uid); // Enforce owner check

    if (error) throw error;
    return true;
  }

  const existing = devStore.invitations.get(id);
  if (existing && existing.user_id === uid) {
    devStore.invitations.delete(id);
    return true;
  }
  return false;
}

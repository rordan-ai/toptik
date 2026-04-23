import { createClient } from "@supabase/supabase-js";
import { hasSupabaseAdminEnv, hasSupabasePublicEnv, supabaseEnv } from "@/lib/supabase/env";

export function createSupabaseServerClient() {
  if (!hasSupabasePublicEnv()) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return createClient(supabaseEnv.publicUrl!, supabaseEnv.publicAnonKey!);
}

export function createSupabaseServiceRoleClient() {
  if (!hasSupabaseAdminEnv()) {
    throw new Error(
      "Missing Supabase admin env vars. Required: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, ADMIN_PANEL_TOKEN",
    );
  }
  return createClient(supabaseEnv.publicUrl!, supabaseEnv.serviceRoleKey!, {
    auth: { persistSession: false },
  });
}

"use client";

import { createClient } from "@supabase/supabase-js";
import { hasSupabasePublicEnv, supabaseEnv } from "@/lib/supabase/env";

export function createSupabaseBrowserClient() {
  if (!hasSupabasePublicEnv()) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(supabaseEnv.publicUrl!, supabaseEnv.publicAnonKey!);
}

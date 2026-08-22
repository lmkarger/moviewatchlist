"use client";

import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <button
      className="p-3 my-5 mx-15 text-4xl hover:underline text-right text-white"
      onClick={logout}
    >
      Logout
    </button>
  );
}

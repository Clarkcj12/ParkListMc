"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import React from "react";

export function SignOutButton(): React.ReactElement {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSignOut = async () => {
    if (isPending) {
      return;
    }

    setIsPending(true);
    try {
      await authClient.signOut();
      router.refresh();
    } catch (err) {
      // Keep a minimal error surface; callers can inspect console or monitoring.
      // Ensure isPending is always reset in finally below.
      // eslint-disable-next-line no-console
      console.error("Sign out failed:", err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleSignOut}
      disabled={isPending}
    >
      {isPending ? "Signing out..." : "Sign out"}
    </Button>
  );
}

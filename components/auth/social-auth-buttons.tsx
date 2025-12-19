"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type Provider = "google" | "discord" | "microsoft";

export interface SocialAuthButtonsProps {
  callbackUrl: string;
  requestSignUp?: boolean;
  disabled?: boolean;
  onStart?: () => void;
  onFinish?: () => void;
  onError?: (msg: string) => void;
}

export default function SocialAuthButtons({
  callbackUrl,
  requestSignUp = false,
  disabled = false,
  onStart,
  onFinish,
  onError,
}: SocialAuthButtonsProps) {
  const [activeProvider, setActiveProvider] = useState<Provider | null>(null);

  const handle = async (provider: Provider) => {
    if (disabled || activeProvider) return;
    setActiveProvider(provider);
    onStart?.();
    try {
      const { error: signInError } = await authClient.signIn.social({
        provider,
        callbackURL: callbackUrl,
        requestSignUp,
      });

      if (signInError) {
        onError?.(signInError.message || "Unable to continue.");
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Social auth failed:", err);
      onError?.("Unable to continue.");
    } finally {
      setActiveProvider(null);
      onFinish?.();
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button
        type="button"
        variant="secondary"
        disabled={disabled || !!activeProvider}
        onClick={() => handle("google")}
      >
        {activeProvider === "google" ? "Connecting..." : "Google"}
      </Button>
      <Button
        type="button"
        variant="secondary"
        disabled={disabled || !!activeProvider}
        onClick={() => handle("microsoft")}
      >
        {activeProvider === "microsoft" ? "Connecting..." : "Microsoft"}
      </Button>
      <Button
        type="button"
        variant="secondary"
        disabled={disabled || !!activeProvider}
        onClick={() => handle("discord")}
      >
        {activeProvider === "discord" ? "Connecting..." : "Discord"}
      </Button>
    </div>
  );
}

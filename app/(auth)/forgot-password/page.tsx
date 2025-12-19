"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { getCallbackUrl } from "@/lib/callback-url";

function getResetRedirect(): string {
  if (typeof window !== "undefined" && window.location) {
    return `${window.location.origin}/reset-password`;
  }
  return "/reset-password";
}

export default function ForgotPasswordPage(): JSX.Element {
  const searchParams = useSearchParams();
  const callbackUrl = getCallbackUrl(searchParams);

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleRequestReset = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { error: requestError } =
        await authClient.requestPasswordReset({
          email,
          redirectTo: getResetRedirect(),
        });

      if (requestError) {
        setError(requestError.message || "Unable to send reset email.");
        return;
      }

      setIsSent(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Password reset request failed:", err);
      setError("Unable to send reset email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="space-y-3 text-center">
          <Badge variant="muted">Password reset</Badge>
          <h1 className="text-3xl font-semibold">Reset your password</h1>
          <p className="text-sm text-slate-400">
            Enter your email and we will send a reset link.
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-3">
            <h2 className="text-xl font-semibold">Request a reset link</h2>
            {error ? (
              <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">
                {error}
              </p>
            ) : null}
            {isSent ? (
              <p className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
                If that email exists, a reset link has been sent.
              </p>
            ) : null}
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleRequestReset}>
              <div className="space-y-2">
                <label className="text-sm text-slate-300" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm text-slate-400">
            <Link
              className="text-emerald-300 transition hover:text-emerald-200"
              href={`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            >
              Back to sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

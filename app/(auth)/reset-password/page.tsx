"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { getCallbackUrl } from "@/lib/callback-url";

export default function ResetPasswordPage(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = getCallbackUrl(searchParams);

  const token = searchParams.get("token");
  const errorParam = searchParams.get("error");

  const isInvalid = !token || Boolean(errorParam);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleReset = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!token) {
      setError("Reset token is missing or invalid.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

      try {
      const { error: resetError } = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (resetError) {
        setError(resetError.message || "Unable to reset password.");
        return;
      }

      setIsDone(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Password reset failed:", err);
      setError("Unable to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="space-y-3 text-center">
          <Badge variant="muted">Set new password</Badge>
          <h1 className="text-3xl font-semibold">Choose a new password</h1>
          <p className="text-sm text-slate-400">
            Use a strong password to secure your account.
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-3">
            <h2 className="text-xl font-semibold">Reset password</h2>
            {error ? (
              <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">
                {error}
              </p>
            ) : null}
            {isDone ? (
              <p className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
                Password updated. Redirecting to sign in.
              </p>
            ) : null}
          </CardHeader>
          <CardContent>
              {!isInvalid ? (
                <form className="space-y-4" onSubmit={handleReset}>
              <div className="space-y-2">
                <label className="text-sm text-slate-300" htmlFor="password">
                  New password
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="New password"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-300" htmlFor="confirm">
                  Confirm password
                </label>
                <Input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(event) => setConfirm(event.target.value)}
                  placeholder="Confirm password"
                  required
                />
              </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update password"}
                </Button>
                </form>
              ) : (
                <div className="py-4">
                  <p className="text-sm text-rose-200">Reset link is invalid or expired.</p>
                </div>
              )}
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

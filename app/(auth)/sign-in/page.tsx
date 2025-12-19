"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { getCallbackUrl } from "@/lib/callback-url";

export default function SignInPage(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = getCallbackUrl(searchParams);
  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeProvider, setActiveProvider] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      router.replace(callbackUrl);
    }
  }, [callbackUrl, router, session]);

  const handleEmailSignIn = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const { data, error: signInError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: callbackUrl,
    });

    if (signInError) {
      setError(signInError.message || "Unable to sign in.");
      setIsSubmitting(false);
      return;
    }

    if (!data?.redirect) {
      router.push(callbackUrl);
    }
    setIsSubmitting(false);
  };

  const handleSocialSignIn = async (provider: "google" | "discord" | "microsoft") => {
    setError(null);
    setActiveProvider(provider);
    setIsSubmitting(true);

    const { error: signInError } = await authClient.signIn.social({
      provider,
      callbackURL: callbackUrl,
    });

    if (signInError) {
      setError(signInError.message || "Unable to sign in.");
      setIsSubmitting(false);
      setActiveProvider(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="space-y-3 text-center">
          <Badge variant="muted">Owner login</Badge>
          <h1 className="text-3xl font-semibold">Welcome back to ParkListMc</h1>
          <p className="text-sm text-slate-400">
            Sign in to manage your listings, votes, and Votifier settings.
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-3">
            <h2 className="text-xl font-semibold">Sign in with email</h2>
            {error ? (
              <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">
                {error}
              </p>
            ) : null}
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleEmailSignIn}>
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
              <div className="space-y-2">
                <label className="text-sm text-slate-300" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Your password"
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && !activeProvider ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Or continue with
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="secondary"
                disabled={isSubmitting}
                onClick={() => handleSocialSignIn("google")}
              >
                {activeProvider === "google" ? "Connecting..." : "Google"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled={isSubmitting}
                onClick={() => handleSocialSignIn("microsoft")}
              >
                {activeProvider === "microsoft" ? "Connecting..." : "Microsoft"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled={isSubmitting}
                onClick={() => handleSocialSignIn("discord")}
              >
                {activeProvider === "discord" ? "Connecting..." : "Discord"}
              </Button>
            </div>
          </CardFooter>
        </Card>

        <p className="text-center text-sm text-slate-400">
          Need an account?{" "}
          <Link
            className="text-emerald-300 transition hover:text-emerald-200"
            href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}

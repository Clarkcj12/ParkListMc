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
import SocialAuthButtons from "@/components/auth/social-auth-buttons";

export default function SignUpPage(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = getCallbackUrl(searchParams);
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session?.user) {
      router.replace(callbackUrl);
    }
  }, [callbackUrl, router, session]);

  const handleEmailSignUp = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { data, error: signUpError } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: callbackUrl,
      });

      if (signUpError) {
        setError(signUpError.message || "Unable to create account.");
        return;
      }

      // Respect provider-driven redirects: if the client returned a redirect we
      // don't push client-side navigation here.
      if (!data?.redirect) {
        router.push(callbackUrl);
      }
    } catch (err) {
      // Network/transport error
      // eslint-disable-next-line no-console
      console.error("Sign up failed:", err);
      setError("Unable to create account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social sign-in/up is handled by `SocialAuthButtons` component.

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="space-y-3 text-center">
          <Badge variant="muted">Owner signup</Badge>
          <h1 className="text-3xl font-semibold">Create your ParkListMc account</h1>
          <p className="text-sm text-slate-400">
            Start listing your theme park server and track votes in one place.
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-3">
            <h2 className="text-xl font-semibold">Sign up with email</h2>
            {error ? (
              <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">
                {error}
              </p>
            ) : null}
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleEmailSignUp}>
              <div className="space-y-2">
                <label className="text-sm text-slate-300" htmlFor="name">
                  Display name
                </label>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Park manager"
                  required
                />
              </div>
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
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Or continue with
            </div>
            <SocialAuthButtons
              callbackUrl={callbackUrl}
              requestSignUp
              disabled={isSubmitting}
              onStart={() => setIsSubmitting(true)}
              onFinish={() => setIsSubmitting(false)}
              onError={(msg) => setError(msg)}
            />
          </CardFooter>
        </Card>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            className="text-emerald-300 transition hover:text-emerald-200"
            href={`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

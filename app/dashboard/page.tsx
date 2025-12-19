import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Shield, Vote } from "lucide-react";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { auth } from "@/lib/auth";

export default async function Dashboard(): Promise<JSX.Element> {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session?.user) {
    redirect(`/sign-in?callbackUrl=${encodeURIComponent("/dashboard")}`);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-14 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="space-y-4">
          <Badge variant="muted">Owner dashboard</Badge>
          <h1 className="text-4xl font-semibold tracking-tight">
            Manage your park listings
          </h1>
          <p className="max-w-3xl text-lg text-slate-300">
            Welcome back, {session.user.name}. Your listings, Votifier
            credentials, and vote reports will live here.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild type="button" variant="outline">
              <Link href="/#directory">View directory</Link>
            </Button>
            <SignOutButton />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Listing controls</h2>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Shield size={16} className="text-emerald-300" />
                Publish updates and manage your park profile.
              </div>
              <div className="flex items-center gap-3">
                <Shield size={16} className="text-emerald-300" />
                Store your Votifier host, port, and public key.
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Vote insights</h2>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Vote size={16} className="text-emerald-300" />
                Track vote totals from web and NuVotifier sources.
              </div>
              <div className="flex items-center gap-3">
                <Vote size={16} className="text-emerald-300" />
                Enforce the 12-hour cooldown with built-in limits.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

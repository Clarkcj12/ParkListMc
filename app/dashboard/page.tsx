import { Shield, Vote } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Dashboard(): JSX.Element {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-14 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="space-y-4">
          <Badge variant="muted">Owner dashboard</Badge>
          <h1 className="text-4xl font-semibold tracking-tight">
            Manage your park listings
          </h1>
          <p className="max-w-3xl text-lg text-slate-300">
            Sign in to create listings, configure NuVotifier credentials, and
            review vote activity.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button type="button">Sign in</Button>
            <Button type="button" variant="outline">
              Create listing
            </Button>
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

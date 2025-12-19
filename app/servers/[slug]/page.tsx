import { ArrowUpRight, Globe, MapPin, Server } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const sampleServers: Record<
  string,
  {
    name: string;
    region: string;
    ip: string;
    description: string;
    tags: string[];
  }
> = {
  "skyline-kingdom-park": {
    name: "Skyline Kingdom Park",
    region: "NA-East",
    ip: "play.skylinekingdom.gg",
    description:
      "Signature coasters, story-driven dark rides, and nightly fireworks shows.",
    tags: ["Theme Park", "Roleplay", "Seasonal"],
  },
};

export default function ServerProfile({
  params,
}: {
  params: { slug: string };
}): JSX.Element {
  const server = sampleServers[params.slug] ?? {
    name: "Park profile coming soon",
    region: "Global",
    ip: "Coming soon",
    description:
      "This profile will display ride details, events, and live voting stats.",
    tags: ["Theme Park"],
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-14 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Badge variant="muted">Park profile</Badge>
          <h1 className="text-4xl font-semibold tracking-tight">{server.name}</h1>
          <p className="max-w-3xl text-lg text-slate-300">
            {server.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {server.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Park details</h2>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Server size={16} className="text-emerald-300" />
                <span>{server.ip}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-emerald-300" />
                <span>{server.region}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={16} className="text-emerald-300" />
                <span>Website link coming soon</span>
              </div>
            </CardContent>
          </Card>

          <Card className="space-y-4">
            <CardHeader>
              <h2 className="text-xl font-semibold">Vote for this park</h2>
              <p className="text-sm text-slate-300">
                Votes refresh every 12 hours. Sign in to track your vote history.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button type="button">
                Vote now
                <ArrowUpRight size={16} />
              </Button>
              <Button type="button" variant="outline">
                Report this listing
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

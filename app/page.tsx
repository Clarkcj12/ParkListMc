import Link from "next/link";

import {
  ArrowUpRight,
  BadgeCheck,
  Castle,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const featured = {
  name: "Skyline Kingdom Park",
  slug: "skyline-kingdom-park",
  summary:
    "Signature coasters, story-driven dark rides, and a nightly fireworks show.",
  online: "428 online",
  votes: "2.4k votes",
  tags: ["Theme Park", "Roleplay", "Seasonal"],
};

const servers = [
  {
    name: "Aurora Adventure Park",
    slug: "aurora-adventure-park",
    region: "NA-East",
    ip: "play.aurorapark.gg",
    description:
      "Cinematic quests connect coasters, drop rides, and scavenger hunts.",
    stats: "210 online / 6.8k votes",
    tags: ["Theme Park", "Adventure"],
  },
  {
    name: "Harborlight Resort",
    slug: "harborlight-resort",
    region: "EU-West",
    ip: "resort.harborlight.gg",
    description:
      "Seaside boardwalk rides, themed hotels, and nightly parades.",
    stats: "132 online / 4.1k votes",
    tags: ["Resort", "Roleplay"],
  },
  {
    name: "Pixel Pier",
    slug: "pixel-pier",
    region: "NA-West",
    ip: "play.pixelpier.gg",
    description:
      "Boardwalk arcade meets ride queues with prize drops every hour.",
    stats: "184 online / 7.3k votes",
    tags: ["Minigames", "Theme Park"],
  },
  {
    name: "Sunset Waterpark",
    slug: "sunset-waterpark",
    region: "APAC",
    ip: "play.sunsetwaterpark.com",
    description:
      "Wave pools, lazy rivers, and summer events on a tropical campus.",
    stats: "96 online / 2.9k votes",
    tags: ["Waterpark", "Resort"],
  },
  {
    name: "Mystic Grove Park",
    slug: "mystic-grove-park",
    region: "EU-North",
    ip: "play.mysticgrove.net",
    description:
      "Storybook forest park with live cast members and collectibles.",
    stats: "74 online / 2.2k votes",
    tags: ["Adventure", "Roleplay"],
  },
  {
    name: "Coaster City Showcase",
    slug: "coaster-city-showcase",
    region: "NA-Central",
    ip: "play.coastercity.net",
    description:
      "Ride-first park with POV tours, synchronized audio, and mega drops.",
    stats: "148 online / 3.7k votes",
    tags: ["Showcase", "Theme Park"],
  },
];

const highlights = [
  {
    title: "Owner dashboards",
    description: "Claim your park, upload ride queues, and manage updates.",
  },
  {
    title: "NuVotifier support",
    description: "Track in-game votes and reward players automatically.",
  },
  {
    title: "Park profiles",
    description: "Showcase queues, events, and your cast member roster.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0">
          <div className="absolute -top-48 left-1/2 h-96 w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[160px]" />
          <div className="absolute -bottom-40 right-0 h-96 w-[600px] rounded-full bg-sky-500/20 blur-[140px]" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-16 pt-14">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="muted">
              <Sparkles size={14} />
              Theme park server directory
            </Badge>
            <Badge variant="outline">NuVotifier-ready</Badge>
            <Badge variant="outline">1 vote / 12h</Badge>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                ParkListMc curates the best Minecraft theme parks.
              </h1>
              <p className="max-w-2xl text-lg text-slate-300">
                Discover immersive servers, ride lineups, and event calendars. Vote for
                your favorites and help the top parks rise to the front page.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Input placeholder="Search parks, rides, or IP" />
                <Button type="button">
                  Explore parks
                  <ArrowUpRight size={16} />
                </Button>
              </div>
            </div>
            <Card className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="default">
                    <Star size={14} />
                    Featured park
                  </Badge>
                  <span className="text-xs text-emerald-200">Online now</span>
                </div>
                <h2 className="text-2xl font-semibold">{featured.name}</h2>
                <p className="text-sm text-slate-300">{featured.summary}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <Badge key={tag} variant="muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-slate-400">
                  {featured.online} / {featured.votes}
                </div>
                <Button asChild type="button" variant="outline" size="sm">
                  <Link href={`/servers/${featured.slug}`}>View profile</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4 rounded-3xl border border-slate-900 bg-slate-950/70 p-6 text-sm text-slate-300 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="space-y-2">
                <div className="flex items-center gap-2 text-slate-100">
                  <BadgeCheck size={16} className="text-emerald-300" />
                  <span className="font-semibold">{item.title}</span>
                </div>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16" id="directory">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">Top ranked parks</h2>
            <p className="text-slate-400">
              Browse trending servers, park events, and community-built attractions.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Users size={16} />
            1,200+ active listings
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {servers.map((server) => (
            <Card key={server.name} className="flex h-full flex-col">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{server.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Castle size={14} />
                      {server.region}
                    </div>
                  </div>
                  <Badge variant="outline">{server.ip}</Badge>
                </div>
                <p className="text-sm text-slate-300">{server.description}</p>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex flex-wrap gap-2">
                  {server.tags.map((tag) => (
                    <Badge key={tag} variant="muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <span className="text-xs text-slate-400">{server.stats}</span>
                <Button asChild type="button" variant="ghost" size="sm">
                  <Link href={`/servers/${server.slug}`}>View</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-900 bg-slate-950/60">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Own a park server?</h2>
            <p className="text-slate-300">
              Claim your listing, manage Votifier settings, and track votes in a
              dedicated dashboard. ParkListMc is built for theme park communities
              that want to grow.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild type="button">
                <Link href="/sign-up">Create a listing</Link>
              </Button>
              <Button asChild type="button" variant="outline">
                <Link href="/sign-in">Owner login</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 rounded-3xl border border-slate-900 bg-slate-950/60 p-6 text-sm text-slate-300">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                What owners get
              </p>
            </div>
            <ul className="space-y-2">
              <li>Live vote tracking with 12-hour cooldown enforcement.</li>
              <li>NuVotifier host/port/public key configuration.</li>
              <li>Spotlight placement for verified servers.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

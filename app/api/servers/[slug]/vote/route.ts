import { createHash } from "crypto";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const VOTE_WINDOW_MS = 12 * 60 * 60 * 1000;
const IP_HASH_SALT = process.env.IP_HASH_SALT;

if (!IP_HASH_SALT) {
  throw new Error("IP_HASH_SALT is required to hash voter IPs.");
}

function getClientIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || null;
  }

  return headers.get("x-real-ip");
}

function hashIp(ip: string): string {
  return createHash("sha256")
    .update(`${IP_HASH_SALT}:${ip}`)
    .digest("hex");
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
): Promise<Response> {
  const server = await prisma.server.findFirst({
    where: { slug: params.slug, status: "PUBLISHED" },
    select: { id: true },
  });

  if (!server) {
    return NextResponse.json({ error: "Server not found." }, { status: 404 });
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });
  const userId = session?.user?.id ?? null;
  const ip = getClientIp(request.headers);
  const ipHash = ip ? hashIp(ip) : null;

  if (!userId && !ipHash) {
    return NextResponse.json(
      { error: "Unable to identify the voter." },
      { status: 400 }
    );
  }

  const since = new Date(Date.now() - VOTE_WINDOW_MS);
  const voterWhere =
    userId && ipHash
      ? { OR: [{ userId }, { ipHash }] }
      : userId
      ? { userId }
      : { ipHash };
  const existingVote = await prisma.vote.findFirst({
    where: {
      serverId: server.id,
      source: "WEB",
      createdAt: { gte: since },
      ...voterWhere,
    },
  });

  if (existingVote) {
    return NextResponse.json(
      { error: "You can vote once every 12 hours." },
      { status: 429 }
    );
  }

  const vote = await prisma.vote.create({
    data: {
      serverId: server.id,
      userId,
      ipHash,
      userAgent: request.headers.get("user-agent"),
      source: "WEB",
    },
  });

  return NextResponse.json({ ok: true, voteId: vote.id }, { status: 201 });
}

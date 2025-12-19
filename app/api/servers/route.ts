import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  publicServerSelect,
  toPublicServerResponse,
} from "@/lib/server-public";
import { slugify } from "@/lib/slug";

export const runtime = "nodejs";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function GET(): Promise<Response> {
  const servers = await prisma.server.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    select: publicServerSelect,
  });

  const payload = servers.map((server) => toPublicServerResponse(server));

  return NextResponse.json(payload);
}

export async function POST(request: Request): Promise<Response> {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!isRecord(parsed)) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }
    body = parsed;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const description =
    typeof body.description === "string" ? body.description.trim() : "";
  const ipAddress =
    typeof body.ipAddress === "string" ? body.ipAddress.trim() : "";

  if (!name || !description || !ipAddress) {
    return NextResponse.json(
      { error: "Name, description, and IP address are required." },
      { status: 400 }
    );
  }

  const slugBase = slugify(
    typeof body.slug === "string" && body.slug.trim()
      ? body.slug
      : name
  );
  const base = slugBase || slugify(`${name}-${Date.now()}`);

  let slug = base;
  let suffix = 1;
  while (await prisma.server.findUnique({ where: { slug } })) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  const tags = Array.isArray(body.tags)
    ? body.tags.map((tag: unknown) => String(tag))
    : undefined;
  const categories = Array.isArray(body.categories)
    ? body.categories.map((tag: unknown) => String(tag))
    : undefined;

  const portValue = Number(body.port);
  const votifierPortValue = Number(body.votifierPort);

  const server = await prisma.server.create({
    data: {
      ownerId: session.user.id,
      name,
      slug,
      description,
      ipAddress,
      port: Number.isFinite(portValue) ? portValue : null,
      website: typeof body.website === "string" ? body.website : null,
      discord: typeof body.discord === "string" ? body.discord : null,
      version: typeof body.version === "string" ? body.version : null,
      region: typeof body.region === "string" ? body.region : null,
      theme: typeof body.theme === "string" ? body.theme : null,
      tags: tags?.length ? tags : null,
      categories: categories?.length ? categories : null,
      bannerUrl: typeof body.bannerUrl === "string" ? body.bannerUrl : null,
      votifierHost:
        typeof body.votifierHost === "string" ? body.votifierHost : null,
      votifierPort: Number.isFinite(votifierPortValue)
        ? votifierPortValue
        : null,
      votifierPublicKey:
        typeof body.votifierPublicKey === "string"
          ? body.votifierPublicKey
          : null,
    },
    select: publicServerSelect,
  });

  return NextResponse.json(toPublicServerResponse(server), { status: 201 });
}

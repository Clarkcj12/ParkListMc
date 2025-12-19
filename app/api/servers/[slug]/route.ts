import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import {
  publicServerSelect,
  toPublicServerResponse,
} from "@/lib/server-public";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
): Promise<Response> {
  const server = await prisma.server.findFirst({
    where: { slug: params.slug, status: "PUBLISHED" },
    select: publicServerSelect,
  });

  if (!server) {
    return NextResponse.json({ error: "Server not found." }, { status: 404 });
  }

  return NextResponse.json(toPublicServerResponse(server));
}

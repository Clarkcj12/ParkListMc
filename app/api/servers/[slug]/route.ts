import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
): Promise<Response> {
  const server = await prisma.server.findUnique({
    where: { slug: params.slug },
    include: {
      _count: {
        select: { votes: true },
      },
    },
  });

  if (!server) {
    return NextResponse.json({ error: "Server not found." }, { status: 404 });
  }

  return NextResponse.json({
    ...server,
    voteCount: server._count.votes,
    _count: undefined,
  });
}

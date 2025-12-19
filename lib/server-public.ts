import { Prisma } from "@prisma/client";

export const publicServerSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  ipAddress: true,
  port: true,
  website: true,
  discord: true,
  version: true,
  region: true,
  theme: true,
  tags: true,
  categories: true,
  bannerUrl: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  _count: {
    select: { votes: true },
  },
} satisfies Prisma.ServerSelect;

export type PublicServer = Prisma.ServerGetPayload<{
  select: typeof publicServerSelect;
}>;

export type PublicServerResponse = Omit<PublicServer, "_count"> & {
  voteCount: number;
};

export function toPublicServerResponse(
  server: PublicServer
): PublicServerResponse {
  const { _count, ...rest } = server;
  return { ...rest, voteCount: _count.votes };
}

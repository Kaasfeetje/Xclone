import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Visibility } from "@prisma/client";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(
      z.object({
        text: z.string(),
        visibility: z.nativeEnum(Visibility),
        replyPermission: z.nativeEnum(Visibility),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.create({
        data: {
          createdAt: new Date(),
          text: input.text,
          visibility: input.visibility,
          replyPermission: input.replyPermission,
          userId: ctx.session.user.id,
        },
      });

      return post;
    }),
  fetchForYou: protectedProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      where: {
        visibility: Visibility.everyone,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    return posts;
  }),
  fetchFollowing: protectedProcedure.query(async ({ ctx }) => {
    const followed = await ctx.prisma.follow.findMany({
      where: {
        followerId: ctx.session.user.id,
      },
      select: {
        followedId: true,
      },
    });

    const posts = await ctx.prisma.post.findMany({
      where: {
        userId: {
          in: followed.map((f) => f.followedId),
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    return posts;
  }),
});

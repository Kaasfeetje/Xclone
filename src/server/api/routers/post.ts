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
  likePost: protectedProcedure
    .input(z.object({ postId: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const likeExists = await ctx.prisma.like.findUnique({
        where: {
          postId_userId: {
            postId: input.postId,
            userId: ctx.session.user.id,
          },
        },
      });

      if (likeExists) {
        await ctx.prisma.like.delete({
          where: {
            postId_userId: {
              postId: input.postId,
              userId: ctx.session.user.id,
            },
          },
        });

        return likeExists.id;
      }

      // im not sure but maybe I need to check if post exists

      const like = await ctx.prisma.like.create({
        data: {
          createdAt: new Date(),
          postId: input.postId,
          userId: ctx.session.user.id,
        },
      });
      return like;
    }),
  repostPost: protectedProcedure
    .input(z.object({ postId: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const repostExists = await ctx.prisma.repost.findUnique({
        where: {
          postId_userId: {
            postId: input.postId,
            userId: ctx.session.user.id,
          },
        },
      });

      if (repostExists) {
        await ctx.prisma.repost.delete({
          where: {
            postId_userId: {
              postId: input.postId,
              userId: ctx.session.user.id,
            },
          },
        });

        return repostExists.id;
      }

      const repost = await ctx.prisma.repost.create({
        data: {
          createdAt: new Date(),
          postId: input.postId,
          userId: ctx.session.user.id,
        },
      });
      return repost;
    }),
  fetchForYou: protectedProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      where: {
        visibility: Visibility.everyone,
      },
      include: {
        user: true,
        likes: {
          where: {
            userId: ctx.session.user.id,
          },
        },
        reposts: {
          where: {
            userId: ctx.session.user.id,
          },
        },
        _count: true,
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
        likes: {
          where: {
            userId: ctx.session.user.id,
          },
        },
        reposts: {
          where: {
            userId: ctx.session.user.id,
          },
        },
        _count: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    return posts;
  }),
});

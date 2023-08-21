import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Visibility } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const commentRouter = createTRPCRouter({
  fetchComments: protectedProcedure
    .input(z.object({ postId: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const comments = await ctx.prisma.post.findMany({
        where: {
          replyToId: input.postId,
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
      });

      return comments;
    }),
  createComment: protectedProcedure
    .input(
      z.object({
        text: z.string(),
        replyToId: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!input.text) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "A post needs either text or images.",
        });
      }

      const comment = await ctx.prisma.post.create({
        data: {
          text: input.text,
          visibility: Visibility.everyone,
          replyPermission: Visibility.everyone,
          replyToId: input.replyToId,
          createdAt: new Date(),
          userId: ctx.session.user.id,
        },
      });

      return comment;
    }),
});

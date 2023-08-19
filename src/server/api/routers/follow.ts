import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const followRouter = createTRPCRouter({
  follow: protectedProcedure
    .input(z.object({ followedId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const followExists = await ctx.prisma.follow.findUnique({
        where: {
          followerId_followedId: {
            followerId: ctx.session.user.id,
            followedId: input.followedId,
          },
        },
      });
      if (followExists) {
        await ctx.prisma.follow.delete({
          where: {
            followerId_followedId: {
              followerId: ctx.session.user.id,
              followedId: input.followedId,
            },
          },
        });

        return followExists.id;
      }

      const follow = await ctx.prisma.follow.create({
        data: {
          createdAt: new Date(),
          followerId: ctx.session.user.id,
          followedId: input.followedId,
        },
      });

      return follow;
    }),
});

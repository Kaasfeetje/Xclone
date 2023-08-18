import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  register: protectedProcedure
    .input(
      z.object({
        username: z.string().min(3),
        profilePicture: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      //TODO: Use image upload instead of url
      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          username: input.username.toLowerCase(),
          profilePicture: input.profilePicture,
          isRegistered: true,
        },
      });
      return updatedUser;
    }),
  profile: protectedProcedure
    .input(z.object({ username: z.string().min(3) }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
        select: {
          //TODO: when implementing profiles add that here
          username: true,
          profilePicture: true,
        },
      });
      return user;
    }),
});

import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";
import { followRouter } from "./routers/follow";
import { commentRouter } from "./routers/comment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
  follow: followRouter,
  comment: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

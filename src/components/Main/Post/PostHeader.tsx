import { Like, Post, Repost, User } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  post: Post & {
    user: User;
    likes: Like[];
    reposts: Repost[];
    _count: {
      replies: number;
      likes: number;
      reposts: number;
    };
  };
  detailed: boolean;
};

const PostHeader = ({ post, detailed }: Props) => {
  return (
    <div className={`${detailed ? "flex" : "flex"}`}>
      {detailed && (
        <div className=" min-w-[52px] pr-3">
          <Link href={`/${post.user.username}`}>
            <img
              src={post.user.profilePicture!}
              width={40}
              height={40}
              className="h-[40px] w-[40px] rounded-full"
            />
          </Link>
        </div>
      )}
      <div className={`${detailed ? "flex flex-col" : "flex"}`}>
        <Link href={`/${post.user.username}`}>
          <span className="text-ellipsis font-bold hover:underline">
            {post.user.name}
          </span>
        </Link>
        {/* verified etc */}
        <Link href={`/${post.user.username}`}>
          <span
            className={`text-ellipsis ${detailed ? "" : "px-1"} text-gray-600`}
          >
            @{post.user.username}
          </span>
        </Link>
      </div>
      {!detailed && (
        <div>
          <span>*</span>
          <span className="pl-1 text-gray-600">
            {((new Date().getTime() - post.createdAt.getTime()) / 1000 / 60)
              .toString()
              .slice(0, 3)}
          </span>
        </div>
      )}
    </div>
  );
};

export default PostHeader;

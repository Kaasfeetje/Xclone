import { Like, Post, User } from "@prisma/client";
import React from "react";
import { FaRegComment } from "react-icons/fa";
import { LiaRetweetSolid } from "react-icons/lia";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoMdStats } from "react-icons/io";
import { FiShare } from "react-icons/fi";
import Link from "next/link";
import { api } from "~/utils/api";

type Props = {
  post: Post & {
    user: User;
    likes: Like[];
    _count: {
      replies: number;
      likes: number;
    };
  };
};

const Post = ({ post }: Props) => {
  const utils = api.useContext();
  const likePostMutation = api.post.likePost.useMutation({
    onSuccess: () => {
      utils.post.invalidate();
    },
  });

  const onLike = () => {
    likePostMutation.mutate({ postId: post.id });
  };

  return (
    <div className="my-3 w-full px-4">
      <div>{/* Retweet like and stuff */}</div>
      <div className="flex w-full">
        <div className="min-w-[52px] pr-3 ">
          <Link href={`/${post.user.username}`}>
            <img
              src={post.user.profilePicture!}
              width={40}
              height={40}
              className="h-[40px] w-[40px] rounded-full"
            />
          </Link>
        </div>
        <div className="grow overflow-x-hidden">
          <div className="">
            <Link href={`/${post.user.username}`}>
              <span className="font-bold">{post.user.name}</span>
            </Link>
            {/* verified etc */}
            <Link href={`/${post.user.username}`}>
              <span className="px-1 text-gray-600">@{post.user.username}</span>
            </Link>
            <span>*</span>
            <span className="pl-1 text-gray-600">
              {((new Date().getTime() - post.createdAt.getTime()) / 1000 / 60)
                .toString()
                .slice(0, 3)}
            </span>
          </div>
          {/* Reply to? */}
          <div>
            <span className="break-words">{post.text}</span>
            {/* Images */}
          </div>
          <div className="mt-3 flex items-center justify-between text-gray-600">
            {/* actions */}
            <div className="flex items-center">
              <FaRegComment className=" w-5 lg:mr-3" />0
            </div>
            <div className="flex items-center">
              <LiaRetweetSolid className=" w-5 lg:mr-3" />0
            </div>
            <button onClick={onLike} className="flex items-center">
              {post.likes.length === 0 ? (
                <>
                  <AiOutlineHeart className=" w-5 lg:mr-3" />
                  <span>{post._count.likes}</span>
                </>
              ) : (
                <>
                  <AiFillHeart className=" w-5 text-red-500 lg:mr-3" />
                  <span className="text-red-500">{post._count.likes}</span>
                </>
              )}
            </button>
            <div className="flex items-center">
              <IoMdStats className=" w-5 lg:mr-3" />0
            </div>
            <div>
              <FiShare className=" w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

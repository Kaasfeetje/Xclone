import { Post, User } from "@prisma/client";
import React from "react";
import { FaRegComment } from "react-icons/fa";
import { LiaRetweetSolid } from "react-icons/lia";
import { AiOutlineHeart } from "react-icons/ai";
import { IoMdStats } from "react-icons/io";
import { FiShare } from "react-icons/fi";

type Props = {
  post: Post & {
    user: User;
  };
};

const Post = ({ post }: Props) => {
  return (
    <div className="my-3 w-full px-4">
      <div>{/* Retweet like and stuff */}</div>
      <div className="flex w-full">
        <div className="min-w-[52px] pr-3 ">
          {/* Profile Picture*/}
          <img
            src={post.user.profilePicture!}
            width={40}
            height={40}
            className="h-[40px] w-[40px] rounded-full"
          />
        </div>
        <div className="grow overflow-x-hidden">
          <div className="">
            <span className="font-bold">{post.user.name}</span>
            {/* verified etc */}
            <span className="px-1 text-gray-600">@{post.user.username}</span>
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
            <div className="flex items-center">
              <AiOutlineHeart className=" w-5 lg:mr-3" />0
            </div>
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

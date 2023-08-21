import { Like, Post, Repost, User } from "@prisma/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { IoMdStats } from "react-icons/io";
import { LiaRetweetSolid } from "react-icons/lia";
import { RiBookmarkLine } from "react-icons/ri";

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
  onRepost: () => void;
  onLike: () => void;
  detailed: boolean;
};

const PostActions = ({ post, onRepost, onLike, detailed }: Props) => {
  return (
    <div className="mt-3 flex items-center justify-between text-gray-600">
      {/* Comment */}
      <div className="flex items-center">
        <FaRegComment
          className={`${detailed ? "h-6 w-6" : "h-5 w-5"} lg:mr-3`}
        />
        {!detailed && <span>{post._count.replies}</span>}
      </div>
      {/* Reposts */}
      <button
        onClick={onRepost}
        className={`flex items-center ${
          post.reposts.length === 0 ? "" : "text-green-500"
        }`}
      >
        <LiaRetweetSolid
          className={`${detailed ? "h-6 w-6" : "h-5 w-5"} lg:mr-3`}
        />
        {!detailed && <span>{post._count.reposts}</span>}
      </button>
      {/* Like */}
      <button onClick={onLike} className="flex items-center">
        {post.likes.length === 0 ? (
          <>
            <AiOutlineHeart
              className={`${detailed ? "h-6 w-6" : "h-5 w-5"} lg:mr-3`}
            />
            {!detailed && <span>{post._count.likes}</span>}
          </>
        ) : (
          <>
            <AiFillHeart
              className={`${
                detailed ? "h-6 w-6" : "h-5 w-5"
              } text-red-500 lg:mr-3`}
            />
            {!detailed && (
              <span className="text-red-500">{post._count.likes}</span>
            )}
          </>
        )}
      </button>
      {/* Bookmark/Viewcount */}
      {detailed ? (
        <div className="flex items-center">
          <RiBookmarkLine className={`${detailed ? "h-6 w-6" : "h-5 w-5"}`} />
        </div>
      ) : (
        <div className="flex items-center">
          <IoMdStats
            className={`${detailed ? "h-6 w-6" : "h-5 w-5"} lg:mr-3`}
          />
          <span>0</span>
        </div>
      )}
      {/* Share */}
      <div>
        <FiShare className={`${detailed ? "h-6 w-6" : "h-5 w-5"}`} />
      </div>
    </div>
  );
};

export default PostActions;

import { Like, Post, Repost, User } from "@prisma/client";
import React from "react";
import { FaRegComment } from "react-icons/fa";
import { LiaRetweetSolid } from "react-icons/lia";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoMdStats } from "react-icons/io";
import { FiShare } from "react-icons/fi";
import Link from "next/link";
import { api } from "~/utils/api";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";

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

const Post = ({ post, detailed }: Props) => {
  const utils = api.useContext();
  const likePostMutation = api.post.likePost.useMutation({
    onSuccess: () => {
      utils.post.invalidate();
      if (post.replyToId !== undefined) {
        utils.comment.invalidate();
      }
    },
  });
  const repostPostMutation = api.post.repostPost.useMutation({
    onSuccess: () => {
      utils.post.invalidate();
    },
  });

  const onLike = (e: React.MouseEvent) => {
    e.preventDefault();
    likePostMutation.mutate({ postId: post.id });
  };

  const onRepost = () => {
    repostPostMutation.mutate({ postId: post.id });
  };

  return (
    <Link href={`/${post.user.username}/tweet/${post.id}`}>
      <div className="my-3 w-full px-4">
        <div>{/* Retweet like and stuff */}</div>
        <div className="flex w-full">
          {!detailed && (
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
          )}
          <div className="grow overflow-x-hidden">
            <PostHeader post={post} detailed={detailed} />
            {/* Reply to? */}
            <div className={`${detailed ? "mt-3" : ""}`}>
              <span className="break-words">{post.text}</span>
              {/* Images */}
            </div>
            {detailed && (
              <>
                <div className="my-4 text-gray-600">
                  <span>{post.createdAt.toUTCString().slice(0, 22)}</span>
                  <span>*</span>
                  <span>
                    <span>{0}</span> views
                  </span>
                </div>
                <div className="pb-4">
                  <span>{post._count.likes} Likes</span>
                  <span>{post._count.reposts} Reposts</span>
                </div>
              </>
            )}
            <PostActions
              post={post}
              onLike={onLike}
              onRepost={onRepost}
              detailed={detailed}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;

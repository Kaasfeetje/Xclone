import { User, Visibility } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import Select from "~/components/common/Select/Select";
import { api } from "~/utils/api";
import PostFormActions from "./PostFormActions";
import Link from "next/link";

type Props = {
  replyToUser: User;
  replyToId: string;
};

const CommentForm = ({ replyToUser, replyToId }: Props) => {
  const { data: session } = useSession();
  const utils = api.useContext();
  const createCommentMutation = api.comment.createComment.useMutation({
    onSuccess: () => {
      utils.comment.invalidate();
    },
  });

  const [isOpen, setIsOpen] = useState(true);

  const text = useRef("");
  const ref = useRef<HTMLSpanElement>(null);

  const postComment = (e: React.FormEvent) => {
    e.preventDefault();
    createCommentMutation.mutate({
      text: text.current,
      replyToId,
    });
    text.current = "";
  };

  return (
    <div>
      <div className="ml-[52px] text-gray-600">
        Replying to{" "}
        <Link href={`/${replyToUser.username}`}>
          <span className="text-blue-500 hover:underline">
            @{replyToUser.username}
          </span>
        </Link>
      </div>

      <div className="flex w-full">
        <div>
          <img
            src={session?.user.profilePicture}
            className="h-[40px] w-[40px] rounded-full"
          />
        </div>
        <form
          onSubmit={postComment}
          className={`${isOpen ? "" : "flex"} w-full`}
        >
          <ContentEditable
            html={text.current}
            onChange={(e) => (text.current = e.target.value)}
            placeholder="What's happening"
            tagName="span"
            innerRef={ref}
            className="ml-3 block w-full pb-3 pt-4 outline-none"
          />
          <div className="mt-3 flex items-center justify-between">
            {isOpen && <PostFormActions />}
            <div>
              <button
                className="rounded-full bg-blue-500 px-4 py-1.5 font-bold text-white hover:bg-blue-600"
                type="submit"
              >
                Reply
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;

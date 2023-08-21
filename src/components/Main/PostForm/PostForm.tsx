import { Visibility } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { FaRegImage } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import Select from "~/components/common/Select/Select";
import { api } from "~/utils/api";
import PostFormActions from "./PostFormActions";

type Props = {};

const PostForm = (props: Props) => {
  const { data: session } = useSession();
  const createPostMutation = api.post.createPost.useMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [visibility, setVisibility] = useState<Visibility>("everyone");
  const [replyPermission, setReplyPermission] =
    useState<Visibility>("everyone");

  const text = useRef("");
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <div className="flex w-full">
      <div>
        <img
          src={session?.user.profilePicture}
          className="w-[40px] rounded-full"
        />
      </div>
      <form className="w-full">
        {isOpen && (
          <Select
            onChange={(e) => setVisibility(e.target.value as Visibility)}
            value={visibility}
          />
        )}
        <ContentEditable
          html={text.current}
          onChange={(e) => (text.current = e.target.value)}
          placeholder="What's happening"
          tagName="span"
          innerRef={ref}
          className="block w-full"
        />
        {isOpen && (
          <Select
            onChange={(e) => setReplyPermission(e.target.value as Visibility)}
            value={replyPermission}
          />
        )}
        <div className="flex justify-between">
          <PostFormActions />
          <div>
            <button type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

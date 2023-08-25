import { Visibility } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import Select from "~/components/common/Select/Select";
import { api } from "~/utils/api";
import PostFormActions from "./PostFormActions";
import { IoEarthOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import DefaultSelectDisplay from "~/components/common/Select/DefaultSelectDisplay";
import ReplyPermissionSelectDisplay from "~/components/common/Select/ReplyPermissionSelectDisplay";

type Props = {};

const PostForm = (props: Props) => {
  const { data: session } = useSession();
  const utils = api.useContext();
  const createPostMutation = api.post.createPost.useMutation({
    onSuccess: () => {
      utils.post.invalidate();
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [visibility, setVisibility] = useState<Visibility>("everyone");
  const [replyPermission, setReplyPermission] =
    useState<Visibility>("everyone");

  const text = useRef("");
  const ref = useRef<HTMLSpanElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(text.current);
    createPostMutation.mutate({
      text: text.current,
      visibility,
      replyPermission,
    });
    text.current = "";
  };

  return (
    <div className="flex w-full">
      <div>
        <img
          src={session?.user.profilePicture}
          className="my-auto h-[40px] w-[40px] rounded-full"
        />
      </div>
      <form onSubmit={onSubmit} className=" ml-3 w-full ">
        {isOpen && (
          <Select
            title="Choose audience"
            DisplayElement={DefaultSelectDisplay}
            onChange={(value) => setVisibility(value as Visibility)}
            value={visibility}
            options={[
              {
                backgroundColor: "bg-blue-500",
                title: "Everyone",
                value: "everyone",
                Icon: IoEarthOutline,
              },
              {
                backgroundColor: "bg-green-500",
                title: "Followers",
                value: "followers",
                Icon: HiOutlineUsers,
              },
            ]}
          />
        )}
        <ContentEditable
          html={text.current}
          onChange={(e) => (text.current = e.currentTarget.innerText)}
          onFocusCapture={() => setIsOpen(true)}
          placeholder="What's happening"
          tagName="span"
          innerRef={ref}
          className="block w-full pb-3 pt-4 outline-none"
        />
        {isOpen && (
          <Select
            title="Who can reply"
            DisplayElement={ReplyPermissionSelectDisplay}
            onChange={(value) => setReplyPermission(value as Visibility)}
            value={replyPermission}
            options={[
              {
                backgroundColor: "bg-blue-500",
                title: "Everyone",
                value: "everyone",
                Icon: IoEarthOutline,
              },
              {
                backgroundColor: "bg-green-500",
                title: "Followers",
                value: "followers",
                Icon: HiOutlineUsers,
              },
            ]}
          />
        )}
        <div className="mt-3 flex justify-between">
          <PostFormActions />
          <div>
            <button
              className="rounded-full bg-blue-500 px-4 py-1.5 font-bold text-white hover:bg-blue-600"
              type="submit"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

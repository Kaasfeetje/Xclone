import { Visibility } from "@prisma/client";
import React, { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { api } from "~/utils/api";

type Props = {};

const CreatePostForm = (props: Props) => {
  const createPostMutation = api.post.createPost.useMutation();

  const [visibility, setVisibility] = useState<Visibility>("everyone");
  const [replyPermission, setReplyPermission] =
    useState<Visibility>("everyone");

  const text = useRef("");
  const ref = useRef<HTMLSpanElement>(null);

  const createPost = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(text.current);
    createPostMutation.mutate({
      text: text.current,
      visibility,
      replyPermission,
    });
  };

  return (
    <div>
      <img />
      <form onSubmit={createPost}>
        <select
          onChange={(e) => setVisibility(e.target.value as Visibility)}
          value={visibility}
          defaultValue={"everyone"}
        >
          <option value="everyone">Everyone</option>
          <option value="followers">Followers</option>
          {/* TODO:Implement circles? */}
        </select>
        <ContentEditable
          html={text.current}
          onChange={(e) => (text.current = e.target.value)}
          placeholder="What's happening"
          tagName="span"
          innerRef={ref}
          className="block w-full"
        />
        <select
          onChange={(e) => setReplyPermission(e.target.value as Visibility)}
          value={replyPermission}
          defaultValue={"everyone"}
        >
          <option value="everyone">Everyone can reply</option>
          <option value="followers">Followers can reply</option>
          {/* TODO:Implement circles? */}
        </select>
        <div>
          <div>
            <button></button>
            <button></button>
            <button></button>
          </div>
          <div>
            <button type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;

import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";

type Props = {};

const PostFormActions = (props: Props) => {
  return (
    <div className="flex">
      <button
        onClick={() => alert("Not implemented yet.")}
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full text-blue-500 transition-all duration-200 hover:bg-blue-100"
      >
        <FaRegImage className="h-5 w-5" />
      </button>
      <button
        onClick={() => alert("Not implemented yet.")}
        type="button"
        className=" flex h-9 w-9 items-center justify-center rounded-full text-blue-500 transition-all duration-200 hover:bg-blue-100"
      >
        <GoTasklist className="h-5 w-5" />
      </button>
      <button
        onClick={() => alert("Not implemented yet.")}
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full text-blue-500 transition-all duration-200 hover:bg-blue-100"
      >
        <BsEmojiSmile className="h-5 w-5" />
      </button>
    </div>
  );
};

export default PostFormActions;

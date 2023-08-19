import React from "react";
import { RiSearchLine } from "react-icons/ri";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className=" bg-white">
      <form className="sticky top-3 mt-3  rounded-full border border-white focus-within:border-blue-500">
        <label>
          <input
            className="peer w-full rounded-full p-3 pl-12 outline-none"
            type="search"
            placeholder="Search..."
          ></input>
          <RiSearchLine className="absolute left-0 top-0 ml-3 mt-[14px] h-5 w-5 peer-focus:text-blue-500 " />
          {/* TODO: add suggestions */}
        </label>
      </form>
      <div className="h-[200vh]">a</div>
    </div>
  );
};

export default Sidebar;

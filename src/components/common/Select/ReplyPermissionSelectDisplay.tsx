import React from "react";
import { SelectOption } from "./Select";

type Props = {
  option: SelectOption;
};
const ReplyPermissionSelectDisplay = ({ option }: Props) => {
  return (
    <div className="flex w-fit items-center rounded-full px-3 font-bold text-blue-500 transition-all duration-200 hover:bg-blue-100">
      <option.Icon />
      <span className="ml-1">{option.title}</span>
    </div>
  );
};

export default ReplyPermissionSelectDisplay;

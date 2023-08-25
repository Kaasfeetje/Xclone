import React from "react";
import { SelectOption } from "./Select";
import { BsChevronDown } from "react-icons/bs";

type Props = {
  option: SelectOption;
};

const DefaultSelectDisplay = ({ option }: Props) => {
  return (
    <div className="flex w-fit items-center rounded-full border border-gray-300 px-3 font-bold text-blue-500">
      <span className="mr-1">{option.title}</span>
      <BsChevronDown />
    </div>
  );
};

export default DefaultSelectDisplay;

import React, { useState } from "react";
import { IconType } from "react-icons/lib";
import { AiOutlineCheck } from "react-icons/ai";
import UseClickOutside from "~/hooks/useClickOutside";

export type SelectOption = {
  value: string;
  title: string;
  backgroundColor: string;
  Icon: IconType;
};

type Props = {
  onChange: (value: string) => void;
  value: string;
  options: SelectOption[];
  DisplayElement: React.JSX.ElementType;
  title: string;
};

const Select = ({ onChange, value, options, DisplayElement, title }: Props) => {
  // TODO: Add keyboard control
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <span onClick={() => setIsOpen(true)}>
        <DisplayElement
          option={options.filter((option) => option.value === value)[0]}
        />
      </span>
      <div className="relative w-0">
        <UseClickOutside
          onOutsideClick={() => setIsOpen(false)}
          className={`absolute -left-[52px] top-2 z-10 w-[260px]   rounded-lg border border-gray-200 bg-white p-3 duration-200 ${
            isOpen ? "opacity-1 visible" : "invisible opacity-0"
          }`}
        >
          <div className="mb-1 text-xl font-bold">{title}</div>
          {options.map((option) => (
            <div
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="flex items-center justify-between px-4 py-3 font-bold"
            >
              <div className="flex items-center">
                <div
                  className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full  text-white ${option.backgroundColor}`}
                >
                  <option.Icon className="h-5 w-5" />
                </div>
                <span>{option.title}</span>
              </div>
              {option.value === value && (
                <div className="ml-5">
                  <AiOutlineCheck className="h-5 text-blue-500" />
                </div>
              )}
            </div>
          ))}
        </UseClickOutside>
      </div>
    </div>
  );
};

export default Select;

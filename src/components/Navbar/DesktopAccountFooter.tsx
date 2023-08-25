import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { TbDots } from "react-icons/tb";
import UseClickOutside from "~/hooks/useClickOutside";

type Props = {
  session: Session;
};

const DesktopAccountFooter = ({ session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <UseClickOutside
      className="absolute bottom-2 hidden w-full py-4 lg:block"
      onOutsideClick={() => setIsOpen(false)}
    >
      <div
        className={`${
          !isOpen ? "hidden" : "block"
        } absolute -top-28 left-0 z-20 w-full overflow-hidden rounded-3xl bg-white shadow-[0px_-1px_5px_0px_rgba(0,0,0,0.3)]`}
      >
        <div className="relative mx-auto mb-2 font-semibold ">
          <button
            className="px-5 py-4"
            onClick={() => alert("Not implemented yet.")}
          >
            Add an existing account
          </button>
          <button
            className="mx-auto px-5 py-4"
            onClick={() => signOut({ callbackUrl: "/signin" })}
          >
            Log out of @{session.user.username}
          </button>
        </div>
      </div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-between rounded-full p-3 transition-all duration-200 hover:bg-gray-200"
      >
        <div className="flex">
          <img
            src={session.user.profilePicture}
            width={40}
            height={40}
            className="h-[40px] w-[40px] rounded-full "
          />
          <div className="ml-3 flex flex-col">
            <span className="-mb-1 font-bold">{session.user.name}</span>
            <span className="text-gray-600">@{session.user.username}</span>
          </div>
        </div>
        <TbDots className="h-5 w-5" />
      </div>
    </UseClickOutside>
  );
};

export default DesktopAccountFooter;

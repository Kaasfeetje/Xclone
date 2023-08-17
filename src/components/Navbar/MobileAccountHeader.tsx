import { Session } from "next-auth";
import Link from "next/link";
import React from "react";
import { HiOutlinePlus } from "react-icons/hi";

type Props = {
  session: Session;
};

const MobileAccountHeader = ({ session }: Props) => {
  return (
    <div className="p-4 md:hidden">
      <div className="flex items-start justify-between">
        <Link href={`/${session.user.username}`}>
          {/* TODO: update this src when switching over to image upload */}
          <img
            className="rounded-full"
            src={session.user.profilePicture}
            width={40}
            height={40}
          />
        </Link>
        <button className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-gray-300">
          <HiOutlinePlus className="h-[18px] w-[18px] text-gray-800" />
        </button>
      </div>
      <Link href={`/${session.user.username}`}>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{session.user.name}</span>
          <span className="-mt-1 text-gray-600">@{session.user.username}</span>
        </div>
      </Link>
      <div className="mt-2">
        <span className="mr-4 text-gray-600">
          <span className="font-semibold text-gray-800">{0}</span> Following
        </span>
        <span className="text-gray-600">
          <span className="font-semibold text-gray-800">{0}</span> Followers
        </span>
      </div>
    </div>
  );
};

export default MobileAccountHeader;

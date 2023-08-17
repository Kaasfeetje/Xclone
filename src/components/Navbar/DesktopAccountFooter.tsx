import { Session } from "next-auth";
import React from "react";
import { TbDots } from "react-icons/tb";

type Props = {
  session: Session;
};

const DesktopAccountFooter = ({ session }: Props) => {
  return (
    <div className="absolute bottom-2 hidden w-full p-4 lg:block">
      <div>popup</div>
      <div className="flex items-center justify-between rounded-full p-3 transition-all duration-200 hover:bg-gray-200">
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
        <TbDots />
      </div>
    </div>
  );
};

export default DesktopAccountFooter;

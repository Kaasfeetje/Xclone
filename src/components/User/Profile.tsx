import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import { FiMail } from "react-icons/fi";
import { TbDots } from "react-icons/tb";
import { api } from "~/utils/api";

type Props = {
  user: {
    id: string;
    username: string | null;
    name: string | null;
    profilePicture: string | null;
  };
  session: Session;
};

const Profile = ({ user, session }: Props) => {
  const followMutation = api.follow.follow.useMutation();
  const onFollow = () => {
    followMutation.mutate({ followedId: user.id });
  };

  return (
    <div>
      <div className="h-[125px] w-full bg-black">{/* banner */}</div>
      <div className="relative flex w-full px-4 pb-3 pt-3">
        <button className="absolute top-0  w-1/4 -translate-y-1/2 rounded-full border-2 border-white">
          <img src={user.profilePicture!} className="rounded-full" />
        </button>
        {session.user.id === user.id ? (
          <div className="ml-auto">
            <button className="mb-3 rounded-full border border-gray-300 bg-white px-3 py-1.5 font-bold transition-all duration-200 hover:bg-gray-200 ">
              Edit profile
            </button>
          </div>
        ) : (
          <div className="ml-auto flex items-center">
            <button
              className="mb-3 mr-2 flex h-9 w-9 items-center justify-center rounded-full border border-gray-300"
              onClick={() => alert("Not implemented yet.")}
            >
              <TbDots className="h-5 w-5" />
            </button>
            <button
              className="mb-3 mr-2 flex h-9 w-9 items-center justify-center rounded-full border border-gray-300"
              onClick={() => alert("Not implemented yet.")}
            >
              <FiMail className="h-5 w-5" />
            </button>
            <button
              onClick={() => onFollow()}
              className="mb-3 rounded-full bg-black px-3 py-1.5 font-bold text-white"
            >
              Follow
            </button>
          </div>
        )}
      </div>
      <div className="mb-5 px-4">
        <div className="mb-3">
          <span className="block text-xl font-bold">{user.name}</span>
          <span className="-mt-1  block text-gray-600">@{user.username}</span>
        </div>
        <p className="mb-3">description</p>
        <div>{/* profile data */}</div>
        <div className="flex">
          <div className="mr-5">
            <span className="font-bold">{0}</span>
            <span className="text-gray-600"> Following</span>
          </div>
          <div>
            <span className="font-bold">{0}</span>
            <span className="text-gray-600"> Followers</span>
          </div>
        </div>
        <div>{/* people you follow who follow this person */}</div>
      </div>
    </div>
  );
};

export default Profile;

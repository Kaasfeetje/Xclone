import React from "react";
import NavbarItem from "./NavbarItem";
import { RiUserLine, RiFileListLine, RiBookmarkLine } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";

type Props = {};

const Navbar = (props: Props) => {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return;
  }

  return (
    <div className="h-screen max-h-screen bg-gray-300">
      <div>
        @{session.user.username}
        <img src={session.user.profilePicture} />
      </div>
      <nav>
        <ul>
          <NavbarItem
            Icon={RiUserLine}
            href={`/${session.user.username}`}
            text="Profile"
          />
          <NavbarItem
            Icon={RiFileListLine}
            href={`/${session.user.username}/lists`}
            text="Lists"
          />
          <NavbarItem
            Icon={RiBookmarkLine}
            href="/i/bookmarks"
            text="Bookmarks"
          />
        </ul>
      </nav>
      <button onClick={() => signOut({ callbackUrl: "/signin" })}>
        Sign out
      </button>
    </div>
  );
};

export default Navbar;

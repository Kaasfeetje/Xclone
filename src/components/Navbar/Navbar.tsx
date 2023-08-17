import React from "react";
import NavbarItem from "./NavbarItem";
import { RiUserLine, RiFileListLine, RiBookmarkLine } from "react-icons/ri";
import { signOut } from "next-auth/react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="h-screen max-h-screen bg-gray-300">
      <div>Profile header thingy placeholder</div>
      <nav>
        <ul>
          {/* TODO: edit profile to username */}
          <NavbarItem Icon={RiUserLine} href="/profile" text="Profile" />
          <NavbarItem
            Icon={RiFileListLine}
            href="/profile/lists"
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

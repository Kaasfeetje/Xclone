import React, { useContext } from "react";
import NavbarItem from "./NavbarItem";
import { RiUserLine, RiFileListLine, RiBookmarkLine } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";
import MobileAccountHeader from "./MobileAccountHeader";
import { NavbarContext } from "~/context/NavbarContext";
import Link from "next/link";
import Xlogo from "../Xlogo";
import DesktopAccountFooter from "./DesktopAccountFooter";

type Props = {};

const Navbar = (props: Props) => {
  const { isOpen, setIsOpen } = useContext(NavbarContext);
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return;
  }

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          isOpen ? "block" : "hidden"
        } fixed left-0 top-0 z-20 h-screen max-h-screen w-[259px] bg-white text-gray-800 lg:left-auto lg:block lg:px-2`}
      >
        <MobileAccountHeader session={session} />
        <div className="hidden lg:block">
          <Link href={"/"}>
            {/* TODO: Might need to change link into a button that refreshes if its on the home page and links to home page if not */}
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full transition-all duration-200 hover:bg-gray-200">
              <Xlogo className="h-8" />
            </div>
          </Link>
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
        <button className="mt-4 hidden h-14 w-[90%] rounded-full bg-blue-500 text-xl font-bold text-white transition-all duration-200 hover:bg-blue-600 lg:block">
          Post
        </button>
        <button
          className="absolute bottom-4 left-4 font-semibold lg:hidden"
          onClick={() => signOut({ callbackUrl: "/signin" })}
        >
          Sign out
        </button>
        <DesktopAccountFooter session={session} />
      </div>
      <div
        onClick={() => setIsOpen(false)}
        className={`${
          isOpen ? "block" : "hidden"
        }  fixed h-screen w-screen bg-black opacity-40 lg:hidden`}
      ></div>
    </>
  );
};

export default Navbar;

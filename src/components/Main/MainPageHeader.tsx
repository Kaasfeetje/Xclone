import React, { RefObject, useContext } from "react";
import { NavbarContext } from "~/context/NavbarContext";
import Xlogo from "../Xlogo";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Tabs from "../common/Tabs/Tabs";

type Props = {
  containerRef: RefObject<HTMLDivElement>;
  children: React.ReactNode[];
};

const MainPageHeader = ({ containerRef, children }: Props) => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const { setIsOpen } = useContext(NavbarContext);
  return (
    <header className="sticky top-0 w-full bg-white">
      {/* TODO: Blurry transparent background */}
      <div className="relative flex items-center justify-center p-4 lg:justify-start lg:p-0">
        <button
          onClick={() => setIsOpen(true)}
          className="absolute left-4 lg:hidden"
        >
          <img
            className="rounded-full"
            src={session?.user.profilePicture}
            width={32}
            height={32}
          />
        </button>
        <Xlogo className="h-7 lg:hidden" />
        <h1 className="hidden h-full w-full cursor-pointer py-4 text-xl font-bold lg:block">
          {router.asPath === "/" ? "Home" : router.asPath}
        </h1>
      </div>
      <Tabs
        tabNames={["For you", "Following"]}
        element={containerRef && containerRef.current}
      >
        {children[0]}
        {children[1]}
      </Tabs>
    </header>
  );
};

export default MainPageHeader;

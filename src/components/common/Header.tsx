import { useRouter } from "next/router";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

type Props = {
  children: React.ReactNode;
};

const Header = ({ children }: Props) => {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-20 flex h-[53px] items-center bg-white">
      {/* TODO: blurry background */}
      <button onClick={() => router.back()}>
        <div className="mr-10 h-full w-5 pl-4">
          <BsArrowLeft />
        </div>
      </button>
      {children}
    </header>
  );
};

export default Header;

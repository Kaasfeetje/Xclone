import React from "react";

type Props = {
  children: React.ReactNode[];
};

const Layout = ({ children }: Props) => {
  console.log("test", children);
  return (
    <div className=" text-gray-800 lg:mx-auto lg:flex lg:w-[1207px]">
      <div className="fixed z-10 w-[259px] lg:static">{children[0]}</div>
      <div className="flex w-full flex-1 justify-between lg:w-[990px]">
        <div className="w-full lg:w-[598px] lg:pr-[45px]">{children[1]}</div>
        {/* TODO: Fix sidebar scroll thingy https://www.youtube.com/watch?v=20Dzekx2qSI */}
        <div className="hidden lg:sticky lg:block lg:w-[350px]">
          {children[2]}
        </div>
      </div>
    </div>
  );
};

export default Layout;

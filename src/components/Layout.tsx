import React from "react";

type Props = {
  children: React.ReactNode[];
};

const Layout = ({ children }: Props) => {
  console.log("test", children);
  return (
    <div className=" lg:mx-auto lg:flex lg:w-[1207px]">
      <div className="fixed z-10 w-[259px] lg:static">{children[0]}</div>
      <div className="flex w-[990px] flex-1 justify-between">
        <div className="w-[598px] pr-[45px]">{children[1]}</div>
        {/* TODO: Fix sidebar scroll thingy https://www.youtube.com/watch?v=20Dzekx2qSI */}
        <div className="hidden lg:sticky lg:block lg:w-[350px]">
          {children[2]}
        </div>
      </div>
    </div>
  );
};

export default Layout;

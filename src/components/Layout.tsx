import React from "react";

type Props = {
  children: React.ReactNode[];
};

const Layout = ({ children }: Props) => {
  return (
    <div className=" lg:mx-auto lg:flex lg:w-max">
      <div className="fixed w-259 lg:static">{children[0]}</div>
      <div className="flex flex-1 justify-between">
        <div className="w-598">{children[1]}</div>
        {/* TODO: Fix sidebar scroll thingy https://www.youtube.com/watch?v=20Dzekx2qSI */}
        <div className="hidden lg:sticky lg:block lg:w-350">{children[2]}</div>
      </div>
    </div>
  );
};

export default Layout;

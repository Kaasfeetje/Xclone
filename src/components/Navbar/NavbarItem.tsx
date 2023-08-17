import Link from "next/link";
import React from "react";
import { IconType } from "react-icons/lib/esm/iconBase";
type Props = {
  Icon: IconType;
  text: string;
  href: string;
};

const NavbarItem = ({ Icon, text, href }: Props) => {
  return (
    <li className={`text-xl font-bold`}>
      <Link href={href}>
        <div className="flex items-center p-4">
          <Icon className="mr-6 h-[24px] w-[24px]" />
          <span>{text}</span>
        </div>
      </Link>
    </li>
  );
};

export default NavbarItem;

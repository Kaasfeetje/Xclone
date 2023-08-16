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
    <li>
      <Link href={href}>
        <div className="flex items-center">
          <Icon />
          {text}
        </div>
      </Link>
    </li>
  );
};

export default NavbarItem;

import React, { useState } from "react";
export const NavbarContext = React.createContext({
  isOpen: false,
  setIsOpen: (value: boolean) => {},
});

type Props = {
  children: React.ReactNode;
};

const NavbarContextProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <NavbarContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContextProvider;

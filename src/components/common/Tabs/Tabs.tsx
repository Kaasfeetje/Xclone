import React, { useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  tabNames: string[];
  children: React.ReactNode[];
  element: HTMLDivElement | null;
  tabCount: number;
};

const Tabs = ({ children, tabNames, element, tabCount }: Props) => {
  const [state, setState] = useState(0);

  const gridClass = {
    2: "grid-cols-2",
    4: "grid-cols-4",
  };

  if (tabNames.length !== children.length) {
    return <div>You should provide as many 'tabNames' as children.</div>;
  }

  return (
    <div>
      <div className={`grid w-full ${gridClass[tabCount as 2 | 4]}  `}>
        {tabNames.map((tabName, idx) => (
          <button
            key={tabName}
            onClick={() => setState(idx)}
            className={`relative flex justify-center bg-white py-4 transition-all duration-200 hover:bg-gray-200  ${
              idx === state
                ? "font-bold text-gray-800"
                : "font-semibold text-gray-600"
            }`}
          >
            <span>{tabName}</span>
            {idx === state && (
              <div className="absolute bottom-0 h-1 w-[56px] bg-blue-500"></div>
            )}
          </button>
        ))}
      </div>
      {element && createPortal(children[state], element)}
    </div>
  );
};

export default Tabs;

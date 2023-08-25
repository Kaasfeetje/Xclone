import React, { useRef, useEffect } from "react";

//CREDITS: https://stackoverflow.com/a/42234988
//Slightly edited by me and obviously I added types

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  onOutsideClick: () => void
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(e: MouseEvent) {
      if (ref && ref.current && !ref.current.contains(e.target as Node)) {
        onOutsideClick();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
type Props = {
  children: React.ReactNode;
  className?: string;
  onOutsideClick: () => void;
};
export default function UseClickOutside({
  children,
  className,
  onOutsideClick,
}: Props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onOutsideClick);

  return (
    <div ref={wrapperRef} className={`${className ? className : ""}`}>
      {children}
    </div>
  );
}

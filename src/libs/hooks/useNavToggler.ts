import { useEffect, useRef, useState } from "react";

const useNavToggler = <T1 extends HTMLElement, T2 extends HTMLElement>() => {
  const [showing, setShowing] = useState(false);

  const btnRef = useRef<T1>(null);
  const menuRef = useRef<T2>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;

      const isBtnClicked = btnRef.current?.contains(target);
      const isMenuClicked = menuRef.current?.contains(target);

      if ((!isBtnClicked && !showing) || (isMenuClicked && showing)) {
        return;
      }

      if (showing && !isBtnClicked) {
        setShowing(false);
      }

      if (isBtnClicked) {
        setShowing((prev) => !prev);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [showing]);

  return { btnRef, menuRef, showing, setShowing };
};

export default useNavToggler;

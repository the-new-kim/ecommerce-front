import { RefObject, useEffect, useState } from "react";

export default function useElementSize<T extends HTMLElement>(
  ref: RefObject<T>
) {
  const [size, setSize] = useState({ clientHeight: 0, clientWidth: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const { clientHeight, clientWidth } = ref.current;

    const getSize = () => {
      setSize({ clientWidth, clientHeight });
    };

    getSize();
    window.addEventListener("resize", getSize);

    return () => window.removeEventListener("resize", getSize);
  }, []);

  return size;
}

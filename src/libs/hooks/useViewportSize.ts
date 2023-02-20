import { useEffect, useState } from "react";

const trueOrFalse = (
  breakPoint: "sm" | "md" | "lg" | "xl" | "2xl",
  currentWidth: number
) => {
  let minimumWidth = 0;
  switch (breakPoint) {
    case "sm":
      minimumWidth = 640;
      break;
    case "md":
      minimumWidth = 768;
      break;
    case "lg":
      minimumWidth = 1024;
      break;
    case "xl":
      minimumWidth = 1280;
      break;
    case "2xl":
      minimumWidth = 1536;
      break;
  }

  return currentWidth > minimumWidth ? true : false;
};

export default function useViewportSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [mediaQuery, setMediaQuery] = useState({
    md: trueOrFalse("md", window.innerWidth),
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        setMediaQuery({
          md: trueOrFalse("md", window.innerWidth),
        });
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { size, mediaQuery };
}

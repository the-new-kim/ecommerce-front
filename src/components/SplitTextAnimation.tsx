import { motion, Transition, Variant, Variants } from "framer-motion";
import { cls } from "../libs/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const parentTransition: Variant = {
  transition: {
    type: "tween",
    staggerChildren: 0.03,
  },
};
const parentVariants: Variants = {
  animate: parentTransition,
  initial: parentTransition,
  exit: parentTransition,
};
const childTransition = {
  duration: 0.4,
  ease: "easeOut",
};
const childVariants: Variants = {
  animate: {
    opacity: 100,
    y: 0,
    transition: childTransition,
  },
  initial: {
    opacity: 0,
    y: "100%",
    transition: childTransition,
  },
  exit: {
    opacity: 0,
    y: "-100%",
    transition: childTransition,
  },
};

interface ISplitTextAnimationProps {
  text: string;
  setState?: Dispatch<SetStateAction<boolean>>;
  transition?: Transition;
}

export default function SplitTextAnimation({
  text,
  setState,
  transition,
}: ISplitTextAnimationProps) {
  const [animationEnded, setAnimationEnded] = useState(false);

  useEffect(() => {
    if (!setState) return;

    const timeoutID = setTimeout(() => {
      setState(true);
    }, 2000);

    return () => clearTimeout(timeoutID);
  }, [animationEnded, setState]);

  return (
    <motion.div
      className="whitespace-nowrap flex h-full"
      variants={parentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
    >
      {text.split("").map((letter, index) => (
        <div key={"text" + index} className="inline-block h-full">
          <motion.div
            key={"text" + index}
            className={cls(
              "h-full flex items-center",
              letter === " " ? "w-3" : ""
            )}
            variants={childVariants}
            onAnimationComplete={() =>
              index === text.length - 1 && setAnimationEnded(true)
            }
          >
            {letter}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

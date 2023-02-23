import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import Heading from "./elements/typos/Heading";
import SplitText from "./SplitText";

interface ILoadingProps {
  text: string;
  setState?: Dispatch<SetStateAction<boolean>>;
}

export default function Loading({ text, setState }: ILoadingProps) {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-screen bg-white fixed top-0 left-0 flex justify-center items-center"
    >
      <Heading>
        <SplitText text={text} setState={setState} />
      </Heading>
    </motion.div>
  );
}

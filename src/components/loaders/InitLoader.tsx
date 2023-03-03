import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { fadeInOutVariants } from "../../libs/variants";
import Heading from "../elements/typos/Heading";
import SplitTextAnimation from "../SplitTextAnimation";

interface ILoadingProps {
  text: string;
  setState?: Dispatch<SetStateAction<boolean>>;
}

export default function InitLoader({ text, setState }: ILoadingProps) {
  return (
    <motion.div
      key="loading"
      variants={fadeInOutVariants}
      initial="fadeOut"
      animate="fadeIn"
      exit="fadeOut"
      className="w-full h-screen bg-white fixed top-0 left-0 flex justify-center items-center"
    >
      <Heading>
        <SplitTextAnimation text={text} setState={setState} />
      </Heading>
    </motion.div>
  );
}

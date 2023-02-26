import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeInOutVariants } from "../../libs/variants";
import Spinner from "./Spinner";

interface IPageLoaderProps {
  showing: boolean;
  children?: ReactNode;
}

export default function PageLoader({ showing, children }: IPageLoaderProps) {
  return (
    <AnimatePresence>
      {showing && (
        <motion.div
          variants={fadeInOutVariants}
          initial="fadeOut"
          animate="fadeIn"
          exit="fadeOut"
          className="fixed top-0 left-0 w-full h-screen z-50 bg-[rgba(0,0,0,0.5)] flex flex-col justify-center items-center"
        >
          <Spinner />
          {children && (
            <div className="mt-10 flex justify-center items-center p-3 text-white">
              {children}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

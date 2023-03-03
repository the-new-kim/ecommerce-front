import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeInOutVariants } from "../../libs/variants";
import CloudLoading from "./CloudLoading";
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
          {/* <Spinner /> */}
          <div className="max-w-xs h-fit">
            <CloudLoading />
          </div>
          {children && (
            <div className="relative flex justify-center items-center text-white">
              {children}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

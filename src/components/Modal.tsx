import { AnimatePresence, motion } from "framer-motion";
import { X } from "phosphor-react";
import { ReactNode } from "react";
import { fadeInOutVariants } from "../libs/variants";

interface IModalProps {
  children: ReactNode;
  showing: boolean;
  setShowing: React.Dispatch<React.SetStateAction<boolean>>;
  layoutId?: string;
}

export default function Modal({
  children,
  showing,
  setShowing,
  layoutId,
}: IModalProps) {
  const closeModal = () => {
    setShowing(false);
  };

  const onModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return (
    <AnimatePresence>
      {showing && (
        <motion.div
          variants={fadeInOutVariants}
          initial="fadeOut"
          animate="fadeIn"
          exit="fadeOut"
          onClick={closeModal}
          className="fixed top-0 left-0 w-full min-h-screen h-full bg-[rgba(0,0,0,0.3)] z-50 flex justify-center items-center overflow-y-auto"
        >
          <motion.div
            onClick={onModalClick}
            layoutId={layoutId}
            className="absolute top-0 left-0 right-0 bottom-0 m-auto max-w-2xl w-full max-h-fit bg-white p-5 z-50"
          >
            <header className="mb-5 w-full flex justify-end items-center">
              <X onClick={closeModal} className="cursor-pointer" />
            </header>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

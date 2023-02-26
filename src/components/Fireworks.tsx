import Lottie from "lottie-react";
import fireworks from "../lotties/fireworks.json";
import { motion } from "framer-motion";
import { fadeInOutVariants } from "../libs/variants";
import { useSetRecoilState } from "recoil";
import { fireworksAtom } from "../libs/atoms";

export default function FireWorks() {
  const setShowing = useSetRecoilState(fireworksAtom);

  const onComplete = () => {
    setShowing(false);
  };

  return (
    <motion.div
      variants={fadeInOutVariants}
      initial="fadeOut"
      animate="fadeIn"
      exit="fadeOut"
      className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50 pointer-events-none"
    >
      <Lottie
        animationData={fireworks}
        className="w-full h-full object-cover"
        loop={false}
        onComplete={onComplete}
      />
    </motion.div>
  );
}

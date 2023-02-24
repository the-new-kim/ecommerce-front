import { motion } from "framer-motion";
import { fadeInOutVariants } from "../../libs/variants";
import Spinner from "./Spinner";

export default function PageLoader() {
  return (
    <motion.div
      variants={fadeInOutVariants}
      initial="fadeOut"
      animate="fadeIn"
      exit="fadeOut"
      className="fixed inset-x-0 w-full h-full z-40 bg-red-50 flex justify-center items-center"
    >
      <Spinner />
    </motion.div>
  );
}

import { motion } from "framer-motion";
export default function Spinner() {
  return (
    <motion.div
      animate={{
        rotate: 360,
        transition: {
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        },
      }}
      initial={true}
      className="w-16 h-16 rounded-[50%] border-slate-300 border-4 border-t-transparent border-b-transparent z-50"
    />
  );
}

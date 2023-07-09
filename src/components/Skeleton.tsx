import { motion, Variants } from "framer-motion";

const backgroundVariants: Variants = {
  initial: {
    x: "-50%",
  },
  animate: {
    x: "0%",
  },
};

interface ISkeletonProps {
  className?: string;
  baseColor?: string;
  shineColor?: string;
  duration?: number;
}

export function Skeleton({
  className,
  baseColor = "#d1d5db",
  shineColor = "#f3f4f6",
  duration = 1,
}: ISkeletonProps) {
  return (
    <div
      className={`w-full h-8 relative rounded-md overflow-hidden ${className}`}
    >
      <motion.div
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
        }}
        className="absolute top-0 left-0 bottom-0 right-0 w-[200%] h-full"
        style={{
          background: `linear-gradient(to right, ${shineColor}, ${baseColor} 10%, ${baseColor} 40%, ${shineColor}, ${baseColor} 60%, ${baseColor} 90%, ${shineColor})`,
        }}
      />
    </div>
  );
}

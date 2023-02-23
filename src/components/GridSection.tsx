import { ReactNode } from "react";
import { LayoutGroup, motion } from "framer-motion";

interface IGridSectionProps {
  children: ReactNode;
}

export default function GridSection({ children }: IGridSectionProps) {
  return (
    <LayoutGroup>
      <motion.section
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-5 w-full"
      >
        {children}
      </motion.section>
    </LayoutGroup>
  );
}

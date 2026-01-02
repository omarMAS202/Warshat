import * as React from "react";
import { motion } from "framer-motion";

type Props = React.PropsWithChildren<{ className?: string }>;

export default function PageFade({ children, className }: Props) {
  return (
    <motion.div className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {children}
    </motion.div>
  );
}

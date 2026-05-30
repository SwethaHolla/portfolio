"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Card({ children, className, delay = 0, hover = true }: CardProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={delay}
      whileHover={hover ? { scale: 1.015, y: -4 } : undefined}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm rounded-sm overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

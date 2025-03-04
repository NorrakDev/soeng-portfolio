// components/Sidebar.tsx
"use client";

import { motion } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function SidebarMenu({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg z-50"
    >
      <button onClick={() => setIsOpen(false)} className="p-4 text-right w-full">
        ✖
      </button>
      <nav className="flex flex-col items-start space-y-4 p-6">
        <a href="/" className="text-lg">Home</a>
        <a href="/work" className="text-lg">Work</a>
        <a href="/about" className="text-lg">About</a>
        <a href="/contact" className="text-lg">Contact</a>
      </nav>
    </motion.aside>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={onToggleTheme}
      className="relative p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] text-[#09090B] dark:text-[#FAFAFA] hover:border-[#10B981] dark:hover:border-[#10B981] transition-colors shadow-sm overflow-hidden flex items-center justify-center cursor-pointer"
      aria-label="Toggle Dark/Light Theme"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        <Sun className="w-4 h-4 text-[#F59E0B]" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="absolute flex items-center justify-center"
      >
        <Moon className="w-4 h-4 text-[#60A5FA]" />
      </motion.div>
    </motion.button>
  );
}

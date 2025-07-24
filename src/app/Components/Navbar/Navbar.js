"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/About" },
  { label: "Cover Maker", href: "/CoverLetter" },
  { label: "CV Maker", href: "/CVmaker" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full px-8 py-5 bg-black text-white flex items-center justify-between border-b border-neutral-800 shadow-[0_0_10px_rgba(255,255,255,0.06)]"
    >
      {/* Left Logo and Name */}
      <Link href="/" className="hidden sm:flex items-center gap-4 cursor-pointer">
        <motion.div whileHover={{ scale: 1.04 }}>
          <div className="w-10 h-10 bg-white text-black flex items-center justify-center text-lg font-bold rounded-lg border border-neutral-600">
            L
          </div>
        </motion.div>
        <span className="font-bold tracking-tight text-white">Lettersmith</span>
      </Link>

      {/* Mobile Center Logo */}
      <div className="sm:hidden text-white text-xl font-extrabold">Lettersmith</div>

      {/* Nav Buttons */}
      <div className="flex gap-2 sm:gap-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.button
                whileHover={{
                  scale: 1.07,
                  backgroundColor: "rgba(6,182,212,0.3)", 
                  color: "#fff",
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.1 }} 
                className={`px-4 py-2 border-2 font-medium text-sm sm:text-base tracking-wide transition-all duration-100 hover:shadow-lg cursor-pointer rounded-lg
                  ${
                    isActive
                      ? "border-white bg-cyan-500 text-black"
                      : "border-white text-white"
                  }`}
              >
                {item.label}
              </motion.button>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navbar;

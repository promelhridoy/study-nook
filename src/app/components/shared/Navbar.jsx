"use client";

import { useState } from "react";
import Image from "next/image";
import { Link, Button } from "@heroui/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Rooms", href: "/all-rooms" },
    { name: "Add Room", href: "/add-room" },
    { name: "My Listings", href: "/my-listings" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  // Framer Motion Variants
  const menuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    visible: { 
      opacity: 1, 
      height: "auto", 
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-default-200 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center transition-opacity hover:opacity-90 ">
            <Image
              src="/assets/logo.png"
              alt="StudyNook Logo"
              width={150}
              height={40}
              priority
              className="h-auto w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-2">
            {navLinks.map((link, idx) => (
              <li 
                key={link.name} 
                className="relative"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link
                  href={link.href}
                  className="relative z-10 block rounded-lg px-4 py-2 font-medium text-foreground transition-colors duration-200 hover:text-primary"
                >
                  {link.name}
                </Link>
                {/* Floating pill background animation */}
                {hoveredIndex === idx && (
                  <motion.span
                    layoutId="navHover"
                    className="absolute inset-0 z-0 rounded-lg bg-default-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              isIconOnly
              variant="light"
              aria-label="Theme Toggle"
              className="hover:bg-default-100 transition-colors"
            >
              <Sun size={18} />
            </Button>

            <Button variant="bordered" size="sm">
              Sign In
            </Button>

            <Button color="primary" size="sm">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button with Icon Rotation */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative rounded-lg p-2 transition hover:bg-default-100 lg:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="overflow-hidden lg:hidden"
            >
              <ul className="flex flex-col gap-1 pb-2">
                {navLinks.map((link) => (
                  <motion.li key={link.name} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="block rounded-lg px-4 py-3 text-foreground transition hover:bg-default-100 font-medium"
                      onPress={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div 
                variants={itemVariants}
                className="mt-2 border-t border-default-200 py-4"
              >
                <div className="flex flex-col gap-3">
                  <Button
                    variant="light"
                    startContent={<Moon size={18} />}
                    fullWidth
                  >
                    Dark Mode
                  </Button>

                  <Button variant="bordered" fullWidth>
                    Sign In
                  </Button>

                  <Button color="primary" fullWidth>
                    Sign Up
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Rooms", href: "/all-rooms" },
    { name: "Add Room", href: "/add-room" },
    { name: "My Listings", href: "/my-listings" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo.png"
              alt="StudyNook Logo"
              width={180}
              height={50}
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
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
                  className="block px-4 py-2 font-medium hover:text-primary"
                >
                  {link.name}
                </Link>

                {hoveredIndex === idx && (
                  <motion.span
                    layoutId="navHover"
                    className="absolute inset-0 rounded-lg bg-default-100 -z-10"
                  />
                )}
              </li>
            ))}
          </ul>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-3">

            {user ? (
              <Link href="/profile">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-10 h-10 rounded-full bg-default-200 flex items-center justify-center overflow-hidden"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={40}
                      height={40}
                    />
                  ) : (
                    <span className="font-bold text-primary">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </motion.div>
              </Link>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="px-3 py-2 rounded-lg hover:bg-default-100"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="px-3 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-default-100"
          >
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="lg:hidden overflow-hidden"
            >
              <ul className="flex flex-col gap-1 pb-2">
                {navLinks.map((link) => (
                  <motion.li key={link.name} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 hover:bg-default-100 rounded-lg"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div className="border-t py-4 flex flex-col gap-3">

                {!user ? (
                  <>
                    <Link
                      href="/signin"
                      className="text-center py-2 border rounded-lg"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/signup"
                      className="text-center py-2 bg-teal-600 text-white rounded-lg"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/profile"
                    className="text-center py-2 border rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
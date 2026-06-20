"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.footer
      className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-colors duration-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          
          {/* Brand Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex justify-center md:justify-start"
            >
              <Link href="/">
                <Image
                  src="/assets/logo.png"
                  alt="StudyNook Logo"
                  width={120}
                  height={40}
                  priority
                />
              </Link>
            </motion.div>

            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto md:mx-0">
              Discover, book, and manage quiet study spaces with ease.
              Designed to help students stay focused and productive.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4"
          >
            <h4 className="text-base font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
              Quick Links
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/rooms"
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  All Rooms
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4"
          >
            <h4 className="text-base font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
              Contact Us
            </h4>

            <div className="text-sm space-y-2 text-slate-500 dark:text-slate-400">
              <p>📍 Central Library, University Campus</p>
              <p>📧 support@studynook.com</p>
              <p>📞 +1 (555) 019-2834</p>
            </div>
          </motion.div>
        </div>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          
          <motion.p
            variants={itemVariants}
            className="text-xs text-slate-500 dark:text-slate-400 order-2 sm:order-1"
          >
            © {currentYear} StudyNook. Crafted with ❤️ using Next.js &
            HeroUI.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 order-1 sm:order-2"
          >
            {[
              {
                icon: <FaFacebook />,
                href: "https://facebook.com",
              },
              {
                icon: <FaXTwitter />,
                href: "https://x.com",
              },
              {
                icon: <FaLinkedin />,
                href: "https://linkedin.com",
              },
              {
                icon: <FaInstagram />,
                href: "https://instagram.com",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-teal-500 transition-all duration-300"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
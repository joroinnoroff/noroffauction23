"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, } from "lucide-react";
import { Toaster, toast } from 'sonner'
import Settings from "./Settings";


import Image from "next/image";


import { MenuIcon, X } from "lucide-react";


export default function Navbar() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
      window
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    setUser(null);
    toast.success("Signed Out");  // Use toast from 'sonner'

    window.location.href = '/';
  };





  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <header className="fixed  top-0 left-0 right-0 z-20 h-f">
      <nav className="flex justify-end items-center py-8 lg:py-4 px-2 w-full">
        <Link href={"/"}>
          <div className="flex items-center gap-2 w-full">
            <h6>Noroff Auction</h6>

          </div>
        </Link>


        <div className="px-4 py-2 ml-2 m-0 rounded-full text-md flex justify-between gap-3 items-center">
          {isLoggedIn ? (
            <>
              <ul className="md:flex items-center text-white/50 hidden w-full">
                <div className="px-4 py-2 ml-2 text-black w-full rounded-full text-md flex justify-between gap-3 items-center">

                  <small className="text-sm w-full flex flex-row">
                    Credit left: {user.credits}
                  </small>
                  <Settings />

                  <p>{user.name}</p>
                  <button
                    className="border py-2 px-10 rounded-2xl text-sm text-gray-800 hover:text-green-900 hover:scale-105 transition-all w-full"
                    onClick={handleLogout}
                    title="Sign Out"
                  >
                    Sign Out
                  </button>
                </div>
              </ul>
            </>
          ) : (
            <>

            </>
          )}
        </div>

        {/* Mobile menu icon */}
        <div className="flex justify-between gap-5 lg:gap-10 mr-5">


        </div>
        <div
          className="cursor-pointer text-md text-black pr-5 hover:text-zinc-500 transition-all none:invert md:hidden"
          onClick={toggleMenu}
        >
          <MenuIcon size={35} />
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed z-999 left-0 top-0 w-full h-screen origin-top bg-blue-500 text-white p-10"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-between">
                <Image src={""} alt="Logo" width={100} height={100} className="none:invert" />

                <p
                  className="cursor-pointer text-md text-black mt-2"
                  onClick={toggleMenu}
                >
                  <X size={35} />
                </p>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center text-center items-center gap-6 mb-5 z-20 "
              >

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  }
};

const MobileNavLink = ({ title, href }: { title: string; href: string }) => (
  <motion.div variants={mobileLinkVars} className="text-md flex z-20">
    <Link className={`uppercase border p-1 lg:p-2 rounded-md transform hover:bg-blue-300 hover:text-white transition-all text-2xl`} href={href}>
      <h1>{title}</h1>
    </Link>
  </motion.div>
);




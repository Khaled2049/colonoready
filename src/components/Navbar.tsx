import React, { useState, useEffect } from "react";
import { useAuth, useUser, SignInButton, UserButton } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, Home, LogIn, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const NavItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="relative group px-3 py-2 transition-colors duration-200"
  >
    <span className="relative z-10">{children}</span>
    {/* Animated underline effect on hover */}
    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
  </button>
);

const ModernNavbar: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const hideNavbar =
    location.pathname.includes("/sign-in") ||
    location.pathname.includes("/sign-up");

  if (hideNavbar) return null;

  const navLinks = [
    { label: "Appointments", icon: <Home size={20} />, path: "/appointments" },
    {
      label: "Schedule",
      icon: <Calendar size={20} />,
      path: "/appointments/operations",
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-700/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Logo />
            </motion.div>

            <div className="flex items-center space-x-6">
              {/* Desktop Navigation Links */}
              {isSignedIn && (
                <div className="hidden md:flex items-center space-x-4 text-sm font-medium text-neutral-200">
                  {navLinks.map((link) => (
                    <NavItem
                      key={link.path}
                      onClick={() => navigate(link.path)}
                    >
                      {link.label}
                    </NavItem>
                  ))}
                </div>
              )}

              {/* Authentication Section */}
              <div className="hidden md:flex items-center space-x-4">
                {isLoaded ? (
                  isSignedIn ? (
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-neutral-300 hidden sm:inline">
                        {user?.firstName}
                      </span>
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  ) : (
                    <SignInButton mode="modal">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        <LogIn size={16} />
                        <span>Sign In</span>
                      </motion.button>
                    </SignInButton>
                  )
                ) : (
                  <div className="h-8 w-20 bg-neutral-700 rounded-lg animate-pulse" />
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-neutral-200 hover:text-white transition-colors p-2"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 top-16 z-40 bg-neutral-900/95 backdrop-blur-xl p-6"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Nav Links */}
              {isSignedIn && (
                <div className="space-y-4">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      onClick={() => navigate(link.path)}
                      className="flex items-center space-x-3 w-full p-3 text-lg font-semibold text-neutral-200 rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Mobile Auth Section */}
              <div className="mt-auto pt-6 border-t border-neutral-700">
                {isLoaded ? (
                  isSignedIn ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-300">
                        {user?.firstName ||
                          user?.primaryEmailAddress?.emailAddress}
                      </span>
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  ) : (
                    <SignInButton mode="modal">
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors">
                        <LogIn size={16} />
                        <span>Sign In</span>
                      </button>
                    </SignInButton>
                  )
                ) : (
                  <div className="h-10 w-full bg-neutral-700 rounded-lg animate-pulse" />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernNavbar;

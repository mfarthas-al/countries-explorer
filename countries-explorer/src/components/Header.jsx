import React from "react";
import { Link } from "react-router-dom";
import { Globe, Heart, LogIn, LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";

const Header = () => {
  const { user, logout } = useUser();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Globe className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-white tracking-tight group-hover:tracking-wide transition-all duration-300">
              World Explorer
            </span>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center px-3 py-2 rounded-full bg-blue-500 bg-opacity-30 text-white">
                  <User className="h-4 w-4 mr-2 text-blue-100" />
                  <span className="text-sm font-medium">{user.username}</span>
                </div>

                <Link 
                  to="/favorites" 
                  className="relative flex items-center px-3 py-2 rounded-md bg-white bg-opacity-10 text-white font-medium text-sm hover:bg-opacity-20 transition-all duration-200"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  <span>Favorites</span>
                </Link>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center px-3 py-2 rounded-md bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 rounded-md bg-white text-blue-600 font-medium text-sm hover:bg-blue-50 transition-all duration-200 shadow-sm"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  <span>Login</span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
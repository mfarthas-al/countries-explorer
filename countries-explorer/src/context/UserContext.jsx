// src/context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsedUser = JSON.parse(stored);
      setUser(parsedUser);
      const favs = localStorage.getItem(`favorites_${parsedUser.username}`);
      setFavorites(favs ? JSON.parse(favs) : []);
    }
  }, []);

  const getFavorites = () => favorites;

  const toggleFavorite = (code) => {
    if (!user) return;
    const updated = favorites.includes(code)
      ? favorites.filter((c) => c !== code)
      : [...favorites, code];
  
    setFavorites(updated);
    localStorage.setItem(`favorites_${user.username}`, JSON.stringify(updated));

    toast.success(
        isFav ? 'Removed from favorites' : 'Added to favorites',
        { icon: isFav ? '💔' : '❤️' }
    );
  };
  

  const login = (username) => {
    const userData = { username };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, getFavorites, toggleFavorite }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

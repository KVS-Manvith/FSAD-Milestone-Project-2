import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for user on load
    const storedUser = localStorage.getItem('nexus_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('nexus_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexus_user');
  };

  // Inactivity Auto-Logout Tracker (2 Minutes)
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      if (user) {
        timeoutId = setTimeout(() => {
          logout();
          alert("Security Notice: You have been automatically logged out due to 2 minutes of inactivity.");
          window.location.href = "/"; // Force redirect to landing page
        }, 120000); // 120,000 ms = 2 minutes
      }
    };

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];

    if (user) {
      resetTimer(); // Start timer as soon as user logs in
      events.forEach(event => window.addEventListener(event, resetTimer));
    }

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

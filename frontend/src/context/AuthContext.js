import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and set user
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } finally {
      setLoading(false);
    }
  };

  const guestLogin = async () => {
    const guestUser = {
      name: 'Guest User',
      type: 'guest'
    };
    setUser(guestUser);
    // Note: We don't set a token for guest users
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, guestLogin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

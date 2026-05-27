import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  user: null,
  guest: false,
  loading: true,
  loginAsGuest: () => {},
  logout: () => {},
  setUser: () => {},
  refreshUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [guest, setGuest] = useState(() => sessionStorage.getItem('starbucks_guest') === 'true');
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setUserState(data.data);
        setGuest(false);
        sessionStorage.removeItem('starbucks_guest');
      } else {
        setUserState(null);
      }
    } catch {
      setUserState(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const loginAsGuest = () => {
    setGuest(true);
    sessionStorage.setItem('starbucks_guest', 'true');
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout failed', error);
    }
    setUserState(null);
    setGuest(false);
    sessionStorage.removeItem('starbucks_guest');
  };

  const setUser = (userData) => {
    setUserState(userData);
    setGuest(false);
    sessionStorage.removeItem('starbucks_guest');
  };

  return (
    <AuthContext.Provider value={{ user, guest, loading, loginAsGuest, logout, setUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

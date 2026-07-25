import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import pb from '@/lib/pocketbaseClient';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(pb.authStore.record);
  useEffect(() => pb.authStore.onChange((_t, r) => setUser(r)), []);
  const value = useMemo(() => ({
    user,
    isAuthed: pb.authStore.isValid,
    login: (email, password) => pb.collection('users').authWithPassword(email, password),
    signup: async (email, password, name) => {
      await pb.collection('users').create({ email, password, passwordConfirm: password, name });
      return pb.collection('users').authWithPassword(email, password);
    },
    logout: () => pb.authStore.clear(),
  }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);
const KEY = 'vishmaya-wishlist';

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);
  const toggle = useCallback((p) => setItems((prev) =>
    prev.find((i) => i.id === p.id) ? prev.filter((i) => i.id !== p.id)
      : [...prev, { id: p.id, title: p.title, image: p.image, price_formatted: p.variants?.[0]?.price_formatted }]
  ), []);
  const has = useCallback((id) => items.some((i) => i.id === id), [items]);
  const remove = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const value = useMemo(() => ({ items, toggle, has, remove }), [items, toggle, has, remove]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

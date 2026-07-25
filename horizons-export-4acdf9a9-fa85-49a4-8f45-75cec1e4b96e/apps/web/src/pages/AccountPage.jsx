import React from 'react';
import { Helmet } from 'react-helmet';
import { Navigate, Link } from 'react-router-dom';
import { useAuth, useWishlist } from '@/context/AppContext';

const AccountPage = () => {
  const { user, isAuthed, logout } = useAuth();
  const { items } = useWishlist();
  if (!isAuthed) return <Navigate to="/login" replace />;
  return (
    <>
      <Helmet><title>My Account | Vishmaya Studio</title></Helmet>
      <div className="max-w-3xl mx-auto px-5 py-20">
        <h1 className="font-display text-5xl mb-2">My Account</h1>
        <p className="text-muted-foreground mb-10">Signed in as {user?.email}</p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-display text-2xl mb-2">Wishlist</h3>
            <p className="text-sm text-muted-foreground mb-4">{items.length} saved {items.length === 1 ? 'piece' : 'pieces'}.</p>
            <Link to="/wishlist" className="text-primary text-xs tracking-[0.2em] uppercase hover:underline">View Wishlist</Link>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-display text-2xl mb-2">Continue Shopping</h3>
            <p className="text-sm text-muted-foreground mb-4">Browse the latest extended artwork.</p>
            <Link to="/shop" className="text-primary text-xs tracking-[0.2em] uppercase hover:underline">Go to Shop</Link>
          </div>
        </div>
        <button onClick={logout} className="mt-10 border hairline px-6 py-3 text-xs tracking-[0.2em] uppercase hover:border-primary hover:text-primary transition">Sign Out</button>
      </div>
    </>
  );
};

export default AccountPage;

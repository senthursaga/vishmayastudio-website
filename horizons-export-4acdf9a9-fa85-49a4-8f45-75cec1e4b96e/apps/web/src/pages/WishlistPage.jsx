import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Heart, X } from 'lucide-react';
import { useWishlist } from '@/context/AppContext';

const WishlistPage = () => {
  const { items, remove } = useWishlist();
  return (
    <>
      <Helmet><title>Wishlist | Vishmaya Studio</title></Helmet>
      <div className="max-w-[72rem] mx-auto px-5 py-16">
        <h1 className="font-display text-5xl mb-10">Your Wishlist</h1>
        {items.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <Heart className="mx-auto mb-4 text-primary" size={40} strokeWidth={1.2} />
            <p className="mb-6">Your wishlist is empty.</p>
            <Link to="/shop" className="bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase">Browse the Shop</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((i) => (
              <div key={i.id} className="glass-card overflow-hidden relative group">
                <button onClick={() => remove(i.id)} className="absolute top-3 right-3 z-10 bg-black/60 p-2 rounded-full text-white/80 hover:text-destructive"><X size={14} /></button>
                <Link to={`/product/${i.id}`}>
                  <img src={i.image} alt={i.title} className="w-full aspect-square object-cover" />
                  <div className="p-5 flex items-center justify-between">
                    <span className="font-display text-lg">{i.title}</span>
                    <span className="gold-text">{i.price_formatted}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistPage;

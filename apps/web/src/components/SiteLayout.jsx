import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, User } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist, useAuth } from '@/context/AppContext';
import ShoppingCartPanel from '@/components/ShoppingCart';

const links = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/shop', label: 'Shop' },
  { to: '/custom', label: 'Custom Artwork' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = ({ onCart }) => {
  const [open, setOpen] = useState(false);
  const { cartItems } = useCart();
  const { items } = useWishlist();
  const { isAuthed } = useAuth();
  const count = cartItems.reduce((n, i) => n + i.quantity, 0);
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-black/70 border-b hairline">
      <div className="max-w-[90rem] mx-auto px-5 h-20 flex items-center justify-between">
        <Link to="/" className="leading-none">
          <span className="block font-display text-2xl tracking-[0.2em] gold-text">VISHMAYA</span>
          <span className="block text-[10px] tracking-[0.45em] text-muted-foreground">STUDIO</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) =>
              `text-xs tracking-[0.18em] uppercase transition-colors ${isActive ? 'text-primary' : 'text-foreground/70 hover:text-primary'}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/account" className="text-foreground/80 hover:text-primary"><User size={19} /></Link>
          <Link to="/wishlist" className="relative text-foreground/80 hover:text-primary">
            <Heart size={19} />
            {items.length > 0 && <span className="absolute -top-2 -right-2 text-[9px] bg-primary text-primary-foreground rounded-full w-4 h-4 grid place-items-center">{items.length}</span>}
          </Link>
          <button onClick={onCart} className="relative text-foreground/80 hover:text-primary">
            <ShoppingBag size={19} />
            {count > 0 && <span className="absolute -top-2 -right-2 text-[9px] bg-primary text-primary-foreground rounded-full w-4 h-4 grid place-items-center">{count}</span>}
          </button>
          <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t hairline bg-black/95 px-5 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm tracking-widest uppercase text-foreground/80 py-1">{l.label}</NavLink>
          ))}
          <Link to="/account" onClick={() => setOpen(false)} className="text-sm tracking-widest uppercase text-primary py-1">{isAuthed ? 'My Account' : 'Sign In'}</Link>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="border-t hairline mt-24 bg-black">
    <div className="max-w-[90rem] mx-auto px-5 py-16 grid gap-10 md:grid-cols-4">
      <div>
        <span className="font-display text-2xl gold-text tracking-[0.2em]">VISHMAYA STUDIO</span>
        <p className="mt-4 text-sm text-muted-foreground max-w-xs">Premium extended artwork, handcrafted in the UK for discerning collectors. The original card is not included.</p>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Explore</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
          <li><Link to="/shop" className="hover:text-primary">Shop</Link></li>
          <li><Link to="/custom" className="hover:text-primary">Custom Artwork</Link></li>
          <li><Link to="/about" className="hover:text-primary">About</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Support</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
          <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-primary">Terms &amp; Conditions</Link></li>
          <li><Link to="/refund" className="hover:text-primary">Refund Policy</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Payments</h4>
        <p className="text-sm text-muted-foreground">Secure checkout via Stripe &amp; PayPal. All prices in GBP.</p>
      </div>
    </div>
    <div className="border-t hairline py-6 text-center text-xs text-muted-foreground">
      &copy; {new Date().getFullYear()} Vishmaya Studio. Independent fan-created collectible art. Not affiliated with or endorsed by any trading card brand.
    </div>
  </footer>
);

const SiteLayout = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onCart={() => setCartOpen(true)} />
      <main className={`flex-grow ${pathname === '/' ? '' : 'pt-20'}`}>{children}</main>
      <Footer />
      <ShoppingCartPanel isCartOpen={cartOpen} setIsCartOpen={setCartOpen} />
    </div>
  );
};

export default SiteLayout;

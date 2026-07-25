import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Search } from 'lucide-react';
import ProductsList from '@/components/ProductsList';

const ShopPage = () => {
  const [search, setSearch] = useState('');
  return (
    <>
      <Helmet><title>Shop | Vishmaya Studio</title><meta name="description" content="Shop premium extended binder artwork collections. Secure checkout with Stripe and PayPal." /></Helmet>
      <div className="max-w-[90rem] mx-auto px-5 py-16">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">The Collection</p>
          <h1 className="font-display text-5xl lg:text-6xl">Shop Extended Artwork</h1>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto">Premium fan-created collectible art. The original card is not included — designed for you to insert your own authentic card.</p>
        </div>
        <div className="relative max-w-md mx-auto mb-12">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search artwork..."
            className="w-full bg-secondary border hairline pl-11 pr-4 py-3 text-sm focus:border-primary outline-none" />
        </div>
        <ProductsList search={search} />
      </div>
    </>
  );
};

export default ShopPage;

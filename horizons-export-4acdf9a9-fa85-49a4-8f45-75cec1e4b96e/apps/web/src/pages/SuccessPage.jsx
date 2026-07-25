import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SuccessPage = () => (
  <>
    <Helmet><title>Order Confirmed | Vishmaya Studio</title></Helmet>
    <div className="max-w-xl mx-auto px-5 py-32 text-center">
      <CheckCircle className="mx-auto text-primary mb-6" size={56} strokeWidth={1.3} />
      <h1 className="font-display text-5xl mb-4">Thank You</h1>
      <p className="text-muted-foreground mb-10">Your order has been confirmed. A receipt is on its way to your inbox, and your artwork will be crafted with care and shipped from our UK studio.</p>
      <Link to="/shop" className="bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-primary/90">Continue Shopping</Link>
    </div>
  </>
);

export default SuccessPage;

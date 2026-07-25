import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { CartProvider } from '@/hooks/useCart';
import { AuthProvider, WishlistProvider } from '@/context/AppContext';
import { Toaster } from '@/components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <WishlistProvider>
      <CartProvider>
        <App />
        <Toaster />
      </CartProvider>
    </WishlistProvider>
  </AuthProvider>
);

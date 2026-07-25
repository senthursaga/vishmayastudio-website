import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SiteLayout from '@/components/SiteLayout';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import GalleryPage from '@/pages/GalleryPage';
import CustomArtworkPage from '@/pages/CustomArtworkPage';
import AboutPage from '@/pages/AboutPage';
import FAQPage from '@/pages/FAQPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import AccountPage from '@/pages/AccountPage';
import WishlistPage from '@/pages/WishlistPage';
import SuccessPage from '@/pages/SuccessPage';
import LegalPage from '@/pages/LegalPage';
import ProductDetailPage from '@/pages/ProductDetailPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SiteLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/custom" element={<CustomArtworkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/privacy" element={<LegalPage kind="privacy" />} />
          <Route path="/terms" element={<LegalPage kind="terms" />} />
          <Route path="/refund" element={<LegalPage kind="refund" />} />
        </Routes>
      </SiteLayout>
    </Router>
  );
}

export default App;

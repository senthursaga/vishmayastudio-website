import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { GALLERY } from '@/lib/gallery';

const types = ['All', 'Electric', 'Fire', 'Water', 'Grass', 'Bespoke'];

const GalleryPage = () => {
  const [filter, setFilter] = useState('All');
  const [zoom, setZoom] = useState(null);
  const items = useMemo(() => filter === 'All' ? GALLERY : GALLERY.filter((g) => g.type === filter), [filter]);
  return (
    <>
      <Helmet><title>Gallery | Vishmaya Studio</title><meta name="description" content="Browse completed premium extended artwork by Vishmaya Studio." /></Helmet>
      <div className="max-w-[90rem] mx-auto px-5 py-16">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Portfolio</p>
          <h1 className="font-display text-5xl lg:text-6xl">The Gallery</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {types.map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`text-[11px] tracking-[0.2em] uppercase px-4 py-2 border transition ${filter === t ? 'border-primary text-primary' : 'hairline text-muted-foreground hover:text-foreground'}`}>{t}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((g) => (
            <motion.button layout key={g.id} onClick={() => setZoom(g)} className="group relative overflow-hidden">
              <img src={g.src} alt={g.title} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                <ZoomIn className="text-primary" size={24} />
                <span className="gold-text">{g.title}</span>
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground">{g.type}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {zoom && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoom(null)} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6">
            <button className="absolute top-6 right-6 text-white/80 hover:text-primary"><X size={28} /></button>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={zoom.src} alt={zoom.title} className="max-h-[85vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;

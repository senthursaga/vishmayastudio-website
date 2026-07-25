import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, PenTool } from 'lucide-react';
import { HERO_IMG, DETAIL_IMG, GALLERY } from '@/lib/gallery';

const HomePage = () => (
  <>
    <Helmet>
      <title>Vishmaya Studio | Every Card Has a Story We Continue It</title>
      <meta name="description" content="We create premium extended artwork that seamlessly continues beyond the borders of genuine Pokémon cards, transforming every binder page into an immersive display worthy of a collector." />
    </Helmet>

    <section className="relative min-h-[100dvh] flex items-center">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Luxury extended binder artwork on display" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>
      <div className="relative max-w-[90rem] mx-auto px-5 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-2xl">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">PREMIUM BINDER ART • MADE IN THE UK</p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
            Every Card Has a Story <span className="gold-text">We Continue It.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-xl">
            We create premium extended artwork that seamlessly continues beyond the borders of genuine Pokémon cards, transforming every binder page into an immersive display worthy of a collector.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/shop" className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition">
              Explore the Gallery <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/custom" className="inline-flex items-center gap-2 border hairline px-8 py-4 text-xs tracking-[0.2em] uppercase text-foreground hover:border-primary hover:text-primary transition">
              Start a Custom Project
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="max-w-[90rem] mx-auto px-5 py-24 grid gap-8 md:grid-cols-3">
      {[
        { icon: Sparkles, t: 'Gallery-Grade Detail', d: 'Rich gold-and-black compositions printed on premium archival stock for a museum-quality finish.' },
        { icon: ShieldCheck, t: 'Card Not Included', d: 'Every piece is designed around a slot for your own authentic card — presentation without compromise.' },
        { icon: PenTool, t: 'Bespoke Commissions', d: 'Work directly with our artists to create a one-of-a-kind extended artwork for your grail card.' },
      ].map((f, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-8">
          <f.icon className="text-primary mb-5" size={28} strokeWidth={1.4} />
          <h3 className="text-2xl mb-3">{f.t}</h3>
          <p className="text-sm text-muted-foreground">{f.d}</p>
        </motion.div>
      ))}
    </section>

    <section className="max-w-[90rem] mx-auto px-5 pb-24 grid gap-12 lg:grid-cols-2 items-center">
      <img src={DETAIL_IMG} alt="Close-up of gold foil extended artwork" className="w-full aspect-[4/5] object-cover" />
      <div>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-5">The Vishmaya Difference</p>
        <h2 className="font-display text-4xl lg:text-5xl mb-6">Art built to elevate the card you already treasure.</h2>
        <p className="text-muted-foreground mb-8">Each extended artwork is an original fan-created interpretation — never an official logo or reproduction. We frame the moment around your genuine card, transforming a single slab into a statement centrepiece worthy of any collection.</p>
        <Link to="/about" className="inline-flex items-center gap-2 text-primary text-sm tracking-[0.2em] uppercase hover:gap-3 transition-all">Our Story <ArrowRight size={16} /></Link>
      </div>
    </section>

    <section className="max-w-[90rem] mx-auto px-5 pb-24">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-display text-4xl lg:text-5xl">Featured Works</h2>
        <Link to="/gallery" className="text-primary text-xs tracking-[0.2em] uppercase hover:underline">View Gallery</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {GALLERY.slice(0, 4).map((g) => (
          <div key={g.id} className="group relative overflow-hidden">
            <img src={g.src} alt={g.title} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
              <span className="text-sm gold-text">{g.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default HomePage;

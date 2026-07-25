import React from 'react';
import { Helmet } from 'react-helmet';
import { ARTIST_IMG } from '@/lib/gallery';

const AboutPage = () => (
  <>
    <Helmet><title>About | Vishmaya Studio</title><meta name="description" content="Vishmaya Studio is a UK-based creative studio crafting premium extended collectible artwork." /></Helmet>
    <div className="max-w-[72rem] mx-auto px-5 py-16">
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Our Story</p>
        <h1 className="font-display text-5xl lg:text-6xl">About Vishmaya Studio</h1>
      </div>
      <img src={ARTIST_IMG} alt="Vishmaya Studio artist at work" className="w-full aspect-[16/9] object-cover mb-14" />
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-3xl mb-4">Craft over compromise</h2>
          <p className="text-muted-foreground">Founded in the UK, Vishmaya Studio was born from a love of collecting and a frustration that treasured cards so often sit hidden in binders. We set out to change that — creating extended artwork that turns a single card into a gallery-worthy display.</p>
        </div>
        <div>
          <h2 className="font-display text-3xl mb-4">Original, fan-created art</h2>
          <p className="text-muted-foreground">Every piece is an original interpretation created by our artists. We never use official logos or reproduce copyrighted artwork. Our work is independent, fan-created collectible art designed purely to complement the genuine card you already own — which is never included.</p>
        </div>
      </div>
      <div className="gold-line my-16" />
      <div className="grid sm:grid-cols-3 gap-8 text-center">
        {[['500+', 'Pieces crafted'], ['UK', 'Studio & shipping'], ['100%', 'Original artwork']].map(([a, b]) => (
          <div key={b}><div className="gold-text font-display text-5xl">{a}</div><div className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2">{b}</div></div>
        ))}
      </div>
    </div>
  </>
);

export default AboutPage;

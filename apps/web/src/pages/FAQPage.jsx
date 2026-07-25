import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  ['Is a Pokémon card included with the artwork?', 'No. Our artwork is designed with a slot for you to insert your own authentic card. The original card is never included.'],
  ['Is this official Pokémon merchandise?', 'No. Vishmaya Studio creates independent, fan-created collectible art. We are not affiliated with, endorsed by, or reproducing any official brand or logo.'],
  ['What materials do you use?', 'Each piece is printed on premium archival stock designed for longevity and a rich, gallery-quality finish.'],
  ['How long does a custom commission take?', 'Most bespoke commissions are completed within 3–4 weeks, depending on complexity. You will receive progress updates throughout.'],
  ['Which payment methods do you accept?', 'We accept secure payments via Stripe and PayPal at checkout, in GBP.'],
  ['Do you ship internationally?', 'Yes. We ship worldwide from the UK. Shipping is calculated at checkout.'],
];

const FAQPage = () => {
  const [open, setOpen] = useState(0);
  return (
    <>
      <Helmet><title>FAQ | Vishmaya Studio</title><meta name="description" content="Frequently asked questions about Vishmaya Studio extended artwork." /></Helmet>
      <div className="max-w-3xl mx-auto px-5 py-16">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Answers</p>
          <h1 className="font-display text-5xl lg:text-6xl">Frequently Asked Questions</h1>
        </div>
        <div className="divide-y hairline border-y hairline">
          {faqs.map(([q, a], i) => (
            <div key={i}>
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between py-6 text-left">
                <span className="text-lg font-display">{q}</span>
                {open === i ? <Minus className="text-primary shrink-0" size={18} /> : <Plus className="text-primary shrink-0" size={18} />}
              </button>
              {open === i && <p className="pb-6 text-sm text-muted-foreground -mt-2">{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQPage;

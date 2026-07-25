import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { useToast } from '@/hooks/use-toast';
import { STUDIO_IMG } from '@/lib/gallery';

const steps = [
  { n: '01', t: 'Share Your Vision', d: 'Tell us about the card and the mood, palette, and creatures you want featured.' },
  { n: '02', t: 'Concept & Quote', d: 'We propose a direction and a fixed quote before any work begins.' },
  { n: '03', t: 'Artwork Creation', d: 'Our artists craft your bespoke extended piece, sharing progress along the way.' },
  { n: '04', t: 'Finishing & Delivery', d: 'Printed on archival stock with a card slot, packaged and shipped from the UK.' },
];

const CustomArtworkPage = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const f = e.target;
    setSending(true);
    try {
      await pb.collection('contact_messages').create({
        name: f.name.value, email: f.email.value, subject: 'Commission enquiry',
        message: f.message.value, kind: 'commission',
      });
      toast({ title: 'Enquiry sent', description: 'We will be in touch within 2 working days.' });
      f.reset();
    } catch { toast({ title: 'Something went wrong', description: 'Please try again.', variant: 'destructive' }); }
    finally { setSending(false); }
  };
  return (
    <>
      <Helmet><title>Custom Artwork | Vishmaya Studio</title><meta name="description" content="Commission a bespoke extended artwork designed around your chosen card." /></Helmet>
      <div className="max-w-[90rem] mx-auto px-5 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Bespoke Service</p>
            <h1 className="font-display text-5xl lg:text-6xl mb-6">Commission Custom Artwork</h1>
            <p className="text-muted-foreground">Have a grail card that deserves a centrepiece? Our artists create one-of-a-kind extended artwork designed entirely around your vision. The original card remains yours to insert into the finished page.</p>
          </div>
          <img src={STUDIO_IMG} alt="Studio process" className="w-full aspect-[4/3] object-cover" />
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {steps.map((s) => (
            <div key={s.n} className="glass-card p-6">
              <span className="gold-text font-display text-3xl">{s.n}</span>
              <h3 className="text-xl mt-3 mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto glass-card p-8">
          <h2 className="font-display text-3xl mb-6 text-center">Start Your Commission</h2>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="name" required placeholder="Your name" className="bg-secondary border hairline px-4 py-3 text-sm focus:border-primary outline-none" />
              <input name="email" type="email" required placeholder="Email" className="bg-secondary border hairline px-4 py-3 text-sm focus:border-primary outline-none" />
            </div>
            <textarea name="message" required rows={5} placeholder="Describe the card and the artwork you envision..." className="w-full bg-secondary border hairline px-4 py-3 text-sm focus:border-primary outline-none" />
            <button disabled={sending} className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-[0.2em] uppercase hover:bg-primary/90 disabled:opacity-60">{sending ? 'Sending...' : 'Submit Enquiry'}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomArtworkPage;

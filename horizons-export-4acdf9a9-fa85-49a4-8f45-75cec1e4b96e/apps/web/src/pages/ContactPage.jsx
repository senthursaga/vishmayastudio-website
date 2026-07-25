import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Mail, MapPin, Clock } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [news, setNews] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    const f = e.target; setSending(true);
    try {
      await pb.collection('contact_messages').create({ name: f.name.value, email: f.email.value, subject: f.subject.value, message: f.message.value, kind: 'contact' });
      toast({ title: 'Message sent', description: 'Thank you — we will reply shortly.' });
      f.reset();
    } catch { toast({ title: 'Error', description: 'Please try again.', variant: 'destructive' }); }
    finally { setSending(false); }
  };
  const subscribe = async (e) => {
    e.preventDefault();
    try { await pb.collection('newsletter_signups').create({ email: news }); toast({ title: 'Subscribed', description: 'Welcome to the studio list.' }); setNews(''); }
    catch { toast({ title: 'Already subscribed?', description: 'This email may already be on our list.' }); }
  };
  return (
    <>
      <Helmet><title>Contact | Vishmaya Studio</title><meta name="description" content="Contact Vishmaya Studio for enquiries and support." /></Helmet>
      <div className="max-w-[72rem] mx-auto px-5 py-16">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Get In Touch</p>
          <h1 className="font-display text-5xl lg:text-6xl">Contact Us</h1>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {[[Mail, 'Email', 'hello@vishmayastudio.co.uk'], [MapPin, 'Studio', 'United Kingdom'], [Clock, 'Response Time', 'Within 2 working days']].map(([Icon, t, d]) => (
              <div key={t} className="flex gap-4">
                <Icon className="text-primary shrink-0" size={22} strokeWidth={1.4} />
                <div><h3 className="text-lg font-display">{t}</h3><p className="text-sm text-muted-foreground">{d}</p></div>
              </div>
            ))}
            <div className="glass-card p-6 mt-4">
              <h3 className="text-xl font-display mb-2">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">Early access to new collections and studio stories.</p>
              <form onSubmit={subscribe} className="flex gap-2">
                <input value={news} onChange={(e) => setNews(e.target.value)} type="email" required placeholder="Your email" className="flex-grow bg-secondary border hairline px-4 py-3 text-sm focus:border-primary outline-none" />
                <button className="bg-primary text-primary-foreground px-5 text-xs tracking-widest uppercase hover:bg-primary/90">Join</button>
              </form>
            </div>
          </div>
          <form onSubmit={submit} className="glass-card p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="name" required placeholder="Name" className="bg-secondary border hairline px-4 py-3 text-sm focus:border-primary outline-none" />
              <input name="email" type="email" required placeholder="Email" className="bg-secondary border hairline px-4 py-3 text-sm focus:border-primary outline-none" />
            </div>
            <input name="subject" placeholder="Subject" className="w-full bg-secondary border hairline px-4 py-3 text-sm focus:border-primary outline-none" />
            <textarea name="message" required rows={5} placeholder="Your message" className="w-full bg-secondary border hairline px-4 py-3 text-sm focus:border-primary outline-none" />
            <button disabled={sending} className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-[0.2em] uppercase hover:bg-primary/90 disabled:opacity-60">{sending ? 'Sending...' : 'Send Message'}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;

import React from 'react';
import { Helmet } from 'react-helmet';

const content = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      ['Overview', 'Vishmaya Studio respects your privacy. This policy explains what information we collect and how we use it when you use our website and services.'],
      ['Information We Collect', 'We collect information you provide directly — such as your name, email address, and order details — as well as newsletter sign-ups and enquiry submissions.'],
      ['How We Use It', 'We use your information to process orders, respond to enquiries, deliver commissions, and (with consent) send newsletters. We never sell your data.'],
      ['Payments', 'Payments are processed securely by Stripe and PayPal. We do not store your full card details on our servers.'],
      ['Your Rights', 'You may request access to, correction of, or deletion of your personal data at any time by contacting hello@vishmayastudio.co.uk.'],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    body: [
      ['Agreement', 'By using this website and placing an order you agree to these terms and conditions.'],
      ['Products', 'All artwork is original, fan-created collectible art. We are not affiliated with or endorsed by any official trading card brand, and we do not use official logos.'],
      ['Card Not Included', 'The original trading card is never included with any product. Our artwork is designed for you to insert your own authentic card.'],
      ['Pricing & Payment', 'All prices are in GBP and payable at checkout via Stripe or PayPal. We reserve the right to update prices at any time.'],
      ['Intellectual Property', 'All original artwork remains the intellectual property of Vishmaya Studio unless otherwise agreed in a commission contract.'],
    ],
  },
  refund: {
    title: 'Refund Policy',
    body: [
      ['Standard Products', 'Unused, undamaged standard artwork may be returned within 14 days of delivery for a refund of the item price. Return shipping is the customer’s responsibility.'],
      ['Custom Commissions', 'Bespoke commissions are made to order and are non-refundable once artwork production has begun, except in the case of a manufacturing defect.'],
      ['Damaged Items', 'If your item arrives damaged, contact us within 7 days with photographs and we will arrange a replacement or full refund.'],
      ['Processing', 'Approved refunds are processed to your original payment method within 5–10 working days.'],
    ],
  },
};

const LegalPage = ({ kind }) => {
  const c = content[kind];
  return (
    <>
      <Helmet><title>{c.title} | Vishmaya Studio</title></Helmet>
      <div className="max-w-3xl mx-auto px-5 py-16">
        <h1 className="font-display text-5xl mb-10">{c.title}</h1>
        <div className="space-y-8">
          {c.body.map(([h, p]) => (
            <div key={h}>
              <h2 className="text-xl font-display text-primary mb-2">{h}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LegalPage;

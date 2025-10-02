import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';

const PremiumPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

  const config = {
    reference: (new Date()).getTime().toString(),
    email: 'user@example.com',  // From user context
    amount: 990000,  // ₦9,900 in kobo
    publicKey,
  };

  const onSuccess = async (response: any) => {
    setLoading(true);
    const verifyRes = await fetch(`/api/payment/verify/${response.reference}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (verifyRes.ok) {
      alert('Premium activated!');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Unlock Premium Features</h2>
      <PaystackButton {...config} text="Pay Now (₦9,900/month)" onSuccess={onSuccess} onClose={() => {}} />
    </div>
  );
};

export default PremiumPage;
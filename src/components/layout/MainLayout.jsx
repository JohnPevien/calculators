import React from 'react';
import Header from '@components/blocks/Header';
import Footer from '@components/blocks/Footer';

export default function MainLayout({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}

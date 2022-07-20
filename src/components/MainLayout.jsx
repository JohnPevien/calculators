import React from 'react';
import Header from './Header';

export default function MainLayout({ children }) {
  return (
    /**
     * TODO: Add footer
     */
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>{children}</main>
    </div>
  );
}

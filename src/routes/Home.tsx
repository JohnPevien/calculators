import React, { JSX } from 'react';
import { Link } from 'react-router';

export default function Home(): JSX.Element {
  return (
    <div className='container mx-auto p-4'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold mb-6'>Welcome to Calculators</h1>
        <p className='mb-6'>Select a calculator from the navigation menu above or click one of the links below:</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='card border rounded-lg shadow p-6 text-center'>
            <h2 className='text-xl font-bold mb-2'>Shipping Calculator</h2>
            <p className='mb-4'>Calculate shipping costs based on weight and dimensions.</p>
            <Link to='/shipping-calculator' className='btn btn-primary'>Go</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

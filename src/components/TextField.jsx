import React from 'react';

/**
 * size:'xs | 'sm' | 'md' | 'lg'
 */
export default function TextField({ size = 'md', placeholder = '' }) {
  console.log(size);
  return (
    <input
      type='text'
      placeholder={placeholder}
      class={`input input-bordered input-${size} w-full max-w-xs`}
    />
  );
}

import React from 'react';

type props = {
  size: 'xs' | 'sm' | 'md' | 'lg';
  placeholder: string;
}


export default function TextField({ size = 'md', placeholder = '' }: props) {
  return (
    <input
      type='text'
      placeholder={placeholder}
      className={`input input-bordered input-${size} w-full max-w-xs`}
    />
  );
}

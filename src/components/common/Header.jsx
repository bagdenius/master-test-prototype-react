import React from 'react';
import { ROUTES } from '../../../config';

export default function Header() {
  return (
    <header className='w-full flex flex-col items-center p-4 bg-white shadow-md'>
      <a href={ROUTES.HOME}>
        <h1 className='text-3xl font-bold text-blue-700'>
          Майстер-Тест [прототип]
        </h1>
      </a>
    </header>
  );
}

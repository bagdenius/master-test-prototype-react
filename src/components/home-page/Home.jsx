import React from 'react';
import InfoBlocks from './InfoBlocks';
import MainGrid2ColsLg1ColSm from '../common/MainGrid2Cols';
import ServiceList from './ServiceList';
import LoginForm from './LoginForm';
import LinksBlock from './LinksBlock';

export default function Home() {
  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-gray-100 text-gray-800'>
      <MainGrid2ColsLg1ColSm>
        <ServiceList />
        <LoginForm />
        <LinksBlock />
        <InfoBlocks />
      </MainGrid2ColsLg1ColSm>
    </div>
  );
}

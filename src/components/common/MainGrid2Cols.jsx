export default function MainGrid2ColsLg1ColSm({ children }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl p-4'>
      {children}
    </div>
  );
}

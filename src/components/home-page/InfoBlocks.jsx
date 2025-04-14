import React from 'react';

export default function InfoBlocks() {
  return (
    <div className='w-full max-w-5xl mt-6'>
      <div className='flex flex-col gap-4'>
        <div className='w-full  p-4 bg-white shadow-md rounded-md'>
          <h3 className='text-lg font-bold text-blue-700'>
            Створення тестів в Майстер-Тест
          </h3>
          <p className='text-gray-700'>
            Майстер-Тест — це безкоштовний сервіс для створення та проходження
            тестів онлайн. Ви можете створювати власні тести та проводити їх у
            реальному часі.
          </p>
        </div>
        <div className='w-full  p-4 bg-white shadow-md rounded-md'>
          <h3 className='text-lg font-bold text-blue-700'>Тестування знань</h3>
          <p className='text-gray-700'>
            Ми — онлайн-сервіс, що дозволяє викладачам та студентам перевіряти
            знання у зручному форматі. Доступно як проходження тестів, так і
            створення власних матеріалів.
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ROUTES } from '../../../config';

export default function TestEditor() {
  const [answers, setAnswers] = useState([``]);

  const handleAddAnswer = () => {
    setAnswers((answers) => answers.concat(``));
  };

  return (
    <div className='w-full min-h-screen bg-gray-100 p-4 flex flex-col items-center'>
      <p className='text-sm text-center text-gray-700 mb-2'>
        Це демонстраційна версія редактора тестів безкоштовного сервісу{' '}
        <a href={ROUTES.HOME} className='text-blue-600 underline'>
          Майстер-Тест
        </a>
        . <br />
        Для того, щоб мати можливість проводити тестування, вам необхідно{' '}
        <a
          href={ROUTES.REGISTER}
          className='text-blue-600 underline font-semibold'>
          зареєструватися
        </a>
        .
      </p>

      <div className='bg-white w-[1000px] border shadow-md text-sm'>
        <div className='flex border-b p-2 bg-gray-100 space-x-4'>
          <button className='text-blue-700 hover:underline cursor-pointer'>
            Додати питання
          </button>
          <button className='text-blue-700 hover:underline cursor-pointer'>
            Змінити тип
          </button>
          <button className='text-blue-700 hover:underline cursor-pointer'>
            Спробуйте тест
          </button>
          <button className='text-blue-700 hover:underline cursor-pointer'>
            Результат
          </button>
        </div>

        <div className='flex'>
          <div className='w-1/3 border-r p-2 bg-gray-50'>
            <strong>Тест</strong>
            <ul className='ml-4 mt-2 list-disc'>
              <li>Питання 1</li>
            </ul>
          </div>

          <div className='w-2/3 p-4'>
            <div className='mb-2'>
              <label className='block font-semibold'>Запитання:</label>
              <input type='text' className='w-full border p-1' />
            </div>

            <div className='mb-2'>
              <label className='block font-semibold'>Тип запитання:</label>
              <select className='border p-1 cursor-pointer'>
                <option>Одна Відповідь</option>
                <option>Кілька Відповідей</option>
              </select>
            </div>

            <div className='mb-2'>
              <label className='block font-semibold'>Відповіді:</label>
              <div className='space-y-1'>
                {answers.map((answer, index) => (
                  <>
                    <div className='flex items-center space-x-2'>
                      <input type='radio' className='cursor-pointer' />
                      <input
                        type='text'
                        className='border p-1 flex-1'
                        key={index}
                        placeholder='Відповідь'
                        value={answer}
                        onChange={(e) => {
                          const updatedAnswers = [...answers];
                          updatedAnswers[index] = e.target.value;
                          setAnswers(updatedAnswers);
                        }}
                      />

                      <button className='text-red-500 cursor-pointer'>
                        Видалити
                      </button>
                    </div>
                  </>
                ))}
              </div>
              <button
                id='add-answer-button'
                className='mt-2 text-blue-700 hover:underline cursor-pointer'
                onClick={handleAddAnswer}>
                + Додати Відповідь
              </button>
              ;
            </div>

            <div className='mb-2'>
              <label className='block font-semibold'>Вага Питання:</label>
              <select className='border p-1 cursor-pointer'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>

            <button className='mt-2 px-3 py-1 bg-gray-300 border border-gray-500 rounded cursor-pointer'>
              Готово
            </button>
          </div>
        </div>

        <div className='flex justify-between border-t p-2 bg-gray-50'>
          <div>
            <button className='text-green-600 cursor-pointer'>
              ← Попереднє
            </button>
            <span className='mx-2'>|</span>
            <button className='text-green-600 cursor-pointer'>Далі →</button>
          </div>
          <div>
            <button className='px-3 py-1 border border-green-600 bg-green-100 rounded cursor-pointer'>
              ✓ Готово
            </button>
          </div>
        </div>

        <div className='p-2 text-right text-blue-700 underline cursor-pointer border-t'>
          💾 Зберегти
        </div>
      </div>
    </div>
  );
}

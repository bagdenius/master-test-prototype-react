import { Link } from 'react-router-dom';
import { ROUTES } from '../../../config';

export default function LoginForm() {
  return (
    <div className='w-full p-4 bg-white shadow-md rounded-md'>
      <h2 className='text-lg font-bold mb-4'>Вхід у Майстер-Тест</h2>
      <form className='flex flex-col space-y-3'>
        <input
          type='email'
          placeholder='Електронна пошта'
          className='p-2 border border-gray-300 rounded'
        />
        <input
          type='password'
          placeholder='Пароль'
          className='p-2 border border-gray-300 rounded'
        />
        <a
          href={ROUTES.DASHBOARD}
          className='block text-center bg-blue-500 text-white p-2 rounded hover:bg-blue-700 cursor-pointer'>
          Увійти
        </a>
        <a href='/recovery' className='text-blue-500 text-sm'>
          Потрібна допомога?
        </a>
      </form>
      <Link
        to={ROUTES.REGISTER}
        className='block text-center mt-4 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-700 cursor-pointer'>
        Реєстрація
      </Link>
    </div>
  );
}

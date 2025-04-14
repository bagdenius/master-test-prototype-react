import React, { useState } from 'react';
import { ROUTES } from '../../../config';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    validateEmail(formData.email) &&
    formData.password.length >= 6;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='mt-8 p-6 bg-white shadow-md rounded-md w-96 mx-auto'>
      <h2 className='text-xl font-bold text-center mb-4'>
        Реєстрація в системі Майстер-Тест
      </h2>
      <form
        className='flex flex-col space-y-4'
        action={() => navigate(ROUTES.DASHBOARD)}>
        <div>
          <label className='block font-semibold'>Ім'я:</label>
          <input
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='block font-semibold'>Прізвище:</label>
          <input
            type='text'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='block font-semibold'>Електронна пошта:</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='block font-semibold'>Пароль:</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <button
          type='submit'
          disabled={!isFormValid}
          className={`block text-center w-full p-2 rounded text-white cursor-pointer ${
            isFormValid
              ? 'bg-blue-500 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}>
          Зареєструватися
        </button>
      </form>
    </div>
  );
}

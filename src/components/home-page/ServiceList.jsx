const services = [
  'Не витрачайте час на перевірку контрольних робіт',
  'Зробіть навчання цікавим',
  'Навчайте дистанційно',
  'Обмінюйтесь досвідом з колегами',
  'Розширте коло своїх учнів',
  'Станьте частиною колективного розуму',
  'Зробіть інтернет кращим',
];

export default function ServiceList() {
  return (
    <div className='w-full p-4'>
      <h2 className='text-lg font-bold mb-2'>Сервіс для викладача</h2>
      <ul className='list-disc pl-5 space-y-2'>
        {services.map((service, index) => (
          <li key={index} className='text-gray-700'>
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}

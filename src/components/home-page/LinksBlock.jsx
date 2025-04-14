import { ROUTES } from '../../../config';

const links = [
  { name: 'створити тест', href: ROUTES.TEST_EDITOR },
  { name: 'каталог тестів', href: ROUTES.TESTS },
  { name: 'блог', href: ROUTES.BLOG },
  { name: 'допомога', href: ROUTES.HELP },
  { name: 'партнери', href: ROUTES.PARTNERS },
];

export default function LinksBlock() {
  return (
    <div className='p-4 bg-white shadow-md rounded-md flex flex-wrap gap-4 self-start justify-center'>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className='text-blue-500 hover:underline'>
          {link.name}
        </a>
      ))}
    </div>
  );
}

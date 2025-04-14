import { test, expect } from '@playwright/test';
import { ROUTES } from '../config';

test('Перевірка коректності відмальовування вмісту головної сторінки', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.HOME}`);

  // Перевірка наявності компонентів
  await expect(page.locator('text=Сервіс для викладача')).toBeVisible();
  await expect(page.locator('text=Вхід у Майстер-Тест')).toBeVisible();
  await expect(page.locator('text=створити тест')).toBeVisible();
  await expect(
    page.locator('text=Створення тестів в Майстер-Тест')
  ).toBeVisible();
  await expect(page.locator('text=Тестування знань')).toBeVisible();

  // Перевірка списку сервісів
  const services = await page.locator('ul.list-disc li').allTextContents();
  expect(services).toEqual([
    'Не витрачайте час на перевірку контрольних робіт',
    'Зробіть навчання цікавим',
    'Навчайте дистанційно',
    'Обмінюйтесь досвідом з колегами',
    'Розширте коло своїх учнів',
    'Станьте частиною колективного розуму',
    'Зробіть інтернет кращим',
  ]);

  // Перевірка форми входу
  await expect(
    page.locator('input[placeholder="Електронна пошта"]')
  ).toBeVisible();
  await expect(page.locator('input[placeholder="Пароль"]')).toBeVisible();
  await expect(page.locator('text=Увійти')).toBeVisible();
  await expect(page.locator('text=Потрібна допомога?')).toBeVisible();
  await expect(page.locator('text=Реєстрація')).toBeVisible();

  // Перевірка посилань
  const links = await page.locator('a.text-blue-500').allTextContents();
  expect(links).toEqual([
    'Потрібна допомога?',
    'створити тест',
    'каталог тестів',
    'блог',
    'допомога',
    'партнери',
  ]);

  // Перевірка інформаційних блоків
  await expect(
    page.locator('text=Майстер-Тест — це безкоштовний сервіс')
  ).toBeVisible();
  await expect(
    page.locator(
      'text=Ми — онлайн-сервіс, що дозволяє викладачам та студентам перевіряти знання у зручному форматі.'
    )
  ).toBeVisible();
});

test('Вхід користувача з форми на головній сторінці', async ({ page }) => {
  await page.goto(`http://localhost:5173${ROUTES.HOME}`);

  // Введення даних у форму
  await page.fill('input[placeholder="Електронна пошта"]', 'test@example.com');
  await page.fill('input[placeholder="Пароль"]', 'password123');

  // Клік на кнопку "Увійти"
  await page.click('text=Увійти');

  // Перевірка, що користувача авторизовано
  await expect(page).toHaveURL(`http://localhost:5173${ROUTES.DASHBOARD}`);
});

test('Перехід на сторінку створення тесту', async ({ page }) => {
  await page.goto(`http://localhost:5173${ROUTES.HOME}`);

  // Клік на посилання "створити тест"
  await page.click('text=створити тест');

  // Перевірка, що користувач перенаправлений на сторінку створення тесту
  await expect(page).toHaveURL(`http://localhost:5173${ROUTES.TEST_EDITOR}`);
});

test('Перехід на сторінку відновлення паролю з форми авторизації на головній сторінці', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.HOME}`);

  // Клік на посилання "Потрібна допомога?"
  await page.click('text=Потрібна допомога?');

  // Перевірка, що користувач перенаправлений на сторінку відновлення пароля
  await expect(page).toHaveURL(`http://localhost:5173${ROUTES.RECOVERY}`);
});

test('Перехід на сторінку списку тестів з головної сторінки', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.HOME}`);

  // Клік на посилання "каталог тестів"
  await page.click('text=каталог тестів');

  // Перевірка, що користувач перенаправлений на сторінку зі списком тестів
  await expect(page).toHaveURL(`http://localhost:5173${ROUTES.TESTS}`);
});

test('Перевірка коректності вмісту інформаційного блоку на головній сторінці', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.HOME}`);

  // Перевірка тексту в першому інформаційному блоці
  await expect(
    page.locator('text=Створення тестів в Майстер-Тест')
  ).toBeVisible();
  await expect(
    page.locator('text=Майстер-Тест — це безкоштовний сервіс')
  ).toBeVisible();

  // Перевірка тексту в другому інформаційному блоці
  await expect(page.locator('text=Тестування знань')).toBeVisible();
  await expect(
    page.locator(
      'text=Ми — онлайн-сервіс, що дозволяє викладачам та студентам перевіряти знання у зручному форматі.'
    )
  ).toBeVisible();
});

test('Перевірка коректності вмісту блоку сервісів', async ({ page }) => {
  await page.goto(`http://localhost:5173${ROUTES.HOME}`);

  // Отримуємо всі елементи списку сервісів
  const serviceItems = await page.locator('ul.list-disc li').allTextContents();

  // Перевіряємо, що кількість елементів відповідає очікуваній
  expect(serviceItems.length).toBe(7);

  // Перевіряємо, що кожен елемент містить правильний текст
  expect(serviceItems).toEqual([
    'Не витрачайте час на перевірку контрольних робіт',
    'Зробіть навчання цікавим',
    'Навчайте дистанційно',
    'Обмінюйтесь досвідом з колегами',
    'Розширте коло своїх учнів',
    'Станьте частиною колективного розуму',
    'Зробіть інтернет кращим',
  ]);
});

test('Перевірка відображення вмісту головної сторінки у дві колонки на великому екрані', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(`http://localhost:5173${ROUTES.HOME}`);

  // Перевірка, що на десктопі grid має 2 колонки
  const grid = await page.locator('div.md\\:grid-cols-2'); // Екрануємо двокрапку
  await expect(grid).toBeVisible();
});

test('Перевірка відображення вмісту головної сторінки в одну колонку на маленькому екрані', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(`http://localhost:5173${ROUTES.HOME}`);

  // Перевірка, що на мобільному grid має 1 колонку
  const grid = await page.locator('div.grid-cols-1');
  await expect(grid).toBeVisible();
});

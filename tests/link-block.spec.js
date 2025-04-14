import { test, expect } from '@playwright/test';
import { ROUTES } from '../config';

test.describe('Links Block', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('Перевірка корекності відображення всіх посилань в навігаційному блоці головної сторінки', async ({
    page,
  }) => {
    const links = await page.locator('a.text-blue-500').allTextContents();
    expect(links).toEqual([
      'Потрібна допомога?',
      'створити тест',
      'каталог тестів',
      'блог',
      'допомога',
      'партнери',
    ]);
  });

  test('Перевірка переходу на сторінку створення тесту з навігаційного блоку головної сторінки', async ({
    page,
  }) => {
    await page.waitForSelector('text=створити тест');
    await page.click('text=створити тест');
    await expect(page).toHaveURL(`http://localhost:5173${ROUTES.TEST_EDITOR}`);
  });

  test('Перевірка переходу на сторінку списку тестів з навігаційного блоку головної сторінки', async ({
    page,
  }) => {
    await page.waitForSelector('text=каталог тестів');
    await page.click('text=каталог тестів');
    await expect(page).toHaveURL(`http://localhost:5173${ROUTES.TESTS}`);
  });

  test('Перевірка переходу на сторінку блогу з навігаційного блоку головної сторінки', async ({
    page,
  }) => {
    await page.waitForSelector('text=блог');
    await page.click('text=блог');
    await expect(page).toHaveURL(`http://localhost:5173${ROUTES.BLOG}`);
  });

  test('Перевірка переходу на сторінку допомоги з навігаційного блоку головної сторінки', async ({
    page,
  }) => {
    await page.waitForSelector('text=допомога');
    await page.click('text=допомога');
    await expect(page).toHaveURL(`http://localhost:5173${ROUTES.RECOVERY}`);
  });

  test('Перевірка переходу на сторінку партнерів з навігаційного блоку головної сторінки', async ({
    page,
  }) => {
    await page.waitForSelector('text=партнери');
    await page.click('text=партнери');
    await expect(page).toHaveURL(`http://localhost:5173${ROUTES.PARTNERS}`);
  });
});

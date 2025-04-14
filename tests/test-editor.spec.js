import { test, expect } from '@playwright/test';
import { ROUTES } from '../config';

test('Перевірка коректності відмальовування вмісту сторінки створення тесту', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.TEST_EDITOR}`);

  // Перевірка наявності елементів
  await expect(
    page.locator('text=Це демонстраційна версія редактора тестів')
  ).toBeVisible();
  await expect(page.locator('text=Додати питання')).toBeVisible();
  await expect(page.locator('text=Змінити тип')).toBeVisible();
  await expect(page.locator('text=Спробуйте тест')).toBeVisible();
  await expect(page.locator('text=Результат')).toBeVisible();
  await expect(page.locator('strong:has-text("Тест")')).toBeVisible();
  await expect(
    page.locator('label:has-text("Запитання:")').first()
  ).toBeVisible();
  await expect(page.locator('text=Тип запитання:')).toBeVisible();
  await expect(page.locator('text=Відповіді:')).toBeVisible();
  await expect(page.locator('text=Вага Питання:')).toBeVisible();
  await expect(
    page.locator('button:has-text("Готово"):not(:has-text("✓ Готово"))')
  ).toBeVisible();
  await expect(page.locator('text=← Попереднє')).toBeVisible();
  await expect(page.locator('text=Далі →')).toBeVisible();
  await expect(page.locator('text=✓ Готово')).toBeVisible();
  await expect(page.locator('text= Зберегти')).toBeVisible();
});

test('Перевірка навігації на головну сторінку та сторінку реєстрації зі сторінки створення тесту', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.TEST_EDITOR}`);

  // Перевірка посилання "Майстер-Тест"
  await page.click('text=Майстер-Тест');

  // Перевірка, що користувач перенаправлений на головну сторінку
  await expect(page).toHaveURL('http://localhost:5173/');

  await page.goto(`http://localhost:5173${ROUTES.TEST_EDITOR}`);

  // Перевірка посилання "зареєструватися"
  await page.click('text=зареєструватися');

  // Перевірка, що користувач перенаправлений на сторінку реєстрації
  await expect(page).toHaveURL('http://localhost:5173/register');
});

test('Перевірка роботи селектора зміни типу тесту у формі створення тесту', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.TEST_EDITOR}`);

  // Вибір іншого типу запитання
  await page.selectOption('select', 'Кілька Відповідей');

  // Перевірка, що вибраний тип запитання змінився
  await expect(page.locator('select').first()).toHaveValue('Кілька Відповідей');
});

// test('Перевірка коректності роботи полів форми створення тесту при вводі', async ({
//   page,
// }) => {
//   await page.goto(`http://localhost:5173${ROUTES.TEST_EDITOR}`);

//   // Заповнення полів запитання та відповіді
//   await page.fill('input[type="text"]', 'Яке місто є столицею України?');
//   await page.locator('input[type="text"]').nth(0).fill('Київ');

//   // Перевірка значень полів
//   await expect(page.locator('input[type="text"]').first()).toHaveValue(
//     'Яке місто є столицею України?'
//   );
//   await expect(page.locator('input[type="text"]').nth(0)).toHaveValue('Київ');
// });

test('Перевірка коректності роботи полів форми створення тесту при вводі', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.TEST_EDITOR}`);

  // Вводимо текст у поле "Запитання"
  const questionInput = page.locator('label:has-text("Запитання:") ~ input');
  await questionInput.fill('Яке місто є столицею України?');
  await expect(questionInput).toHaveValue('Яке місто є столицею України?');

  // Вибираємо тип запитання
  const typeSelect = page.locator('label:has-text("Тип запитання:") ~ select');
  await typeSelect.selectOption({ label: 'Кілька Відповідей' });
  await expect(typeSelect).toHaveValue('Кілька Відповідей');

  // Вводимо текст у поле "Відповідь"
  const answerInput = page.locator('input[placeholder="Відповідь"]').first();
  await answerInput.fill('Київ');
  await expect(answerInput).toHaveValue('Київ');

  // Вибираємо вагу питання
  const weightSelect = page.locator('label:has-text("Вага Питання:") ~ select');
  await weightSelect.selectOption({ label: '2' });
  await expect(weightSelect).toHaveValue('2');
});

test('Перевірка роботи селектора зміни ваги питання у формі створення тесту', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.TEST_EDITOR}`);

  // Вибір ваги запитання
  await page.locator('select').nth(1).selectOption('3');

  // Перевірка, що вибрана вага запитання
  await expect(page.locator('select').nth(1)).toHaveValue('3');
});

test('Перевірка роботи радіо-селектору у формі створення тесту', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.TEST_EDITOR}`);

  // Вибір радіо кнопки
  await page.locator('input[type="radio"]').nth(0).click();

  // перевірка, що радіо кнопка вибрана.
  await expect(page.locator('input[type="radio"]').nth(0)).toBeChecked();
});

test('Перевірка додавання варіанту відповіді на кнопку в формі створення тесту', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.TEST_EDITOR}`);

  // Отримуємо початкову кількість полів для відповідей
  const initialAnswerFields = await page
    .locator('input[placeholder="Відповідь"]')
    .count();

  // Натискаємо кнопку "Додати Відповідь" (з очікуванням)
  await page.waitForSelector('button#add-answer-button'); // Використовуємо id селектор
  await page.click('button#add-answer-button');

  // Отримуємо нову кількість полів для відповідей
  const newAnswerFields = await page
    .locator('input[placeholder="Відповідь"]')
    .count();

  // Перевіряємо, що кількість полів залишилася незмінною (це має викликати помилку)
  expect(newAnswerFields).toBe(initialAnswerFields + 1);
});

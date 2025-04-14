import { test, expect } from '@playwright/test';
import { ROUTES } from '../config';

test('Перевірка коректності відмальовування вмісту форми реєстрації', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.REGISTER}`);

  // Перевірка наявності елементів форми
  await expect(
    page.locator('text=Реєстрація в системі Майстер-Тест')
  ).toBeVisible();
  await expect(page.locator('label:has-text("Ім\'я:")')).toBeVisible();
  await expect(page.locator('label:has-text("Прізвище:")')).toBeVisible();
  await expect(
    page.locator('label:has-text("Електронна пошта:")')
  ).toBeVisible();
  await expect(page.locator('label:has-text("Пароль:")')).toBeVisible();
  await expect(
    page.locator('button:has-text("Зареєструватися")')
  ).toBeVisible();
});

test('Перевірка роботи полів вводу форми реєстрації', async ({ page }) => {
  await page.goto(`http://localhost:5173${ROUTES.REGISTER}`);

  // Заповнення полів форми
  await page.fill('input[name="firstName"]', 'Іван');
  await page.fill('input[name="lastName"]', 'Петров');
  await page.fill('input[name="email"]', 'ivan.petrov@example.com');
  await page.fill('input[name="password"]', 'password123');

  // Перевірка значень полів
  await expect(page.locator('input[name="firstName"]')).toHaveValue('Іван');
  await expect(page.locator('input[name="lastName"]')).toHaveValue('Петров');
  await expect(page.locator('input[name="email"]')).toHaveValue(
    'ivan.petrov@example.com'
  );
  await expect(page.locator('input[name="password"]')).toHaveValue(
    'password123'
  );
});

test('Перевірка деактивації можливості реєстрації при некоректно введених даних в полях вводу форми реєстрації', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.REGISTER}`);

  // Перевірка, що кнопка "Зареєструватися" вимкнена, коли форма не заповнена
  await expect(
    page.locator('button:has-text("Зареєструватися")')
  ).toBeDisabled();

  // Заповнення одного поля
  await page.fill('input[name="firstName"]', 'Іван');

  // Перевірка, що кнопка все ще вимкнена, оскільки форма неповна
  await expect(
    page.locator('button:has-text("Зареєструватися")')
  ).toBeDisabled();
});

test('Перевірка активації можливості реєстрації при коректно введених даних в полях вводу форми реєстрації', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.REGISTER}`);

  // Заповнення всіх полів форми
  await page.fill('input[name="firstName"]', 'Іван');
  await page.fill('input[name="lastName"]', 'Петров');
  await page.fill('input[name="email"]', 'ivan.petrov@example.com');
  await page.fill('input[name="password"]', 'password123');

  // Перевірка, що кнопка "Зареєструватися" ввімкнена
  await expect(
    page.locator('button:has-text("Зареєструватися")')
  ).toBeEnabled();
});

test('Перевірка реєстрації користувача та перенаправлення на сторінку користувача', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.REGISTER}`);

  // Заповнення всіх полів форми
  await page.fill('input[name="firstName"]', 'Іван');
  await page.fill('input[name="lastName"]', 'Петров');
  await page.fill('input[name="email"]', 'ivan.petrov@example.com');
  await page.fill('input[name="password"]', 'password123');

  // Клік на кнопку "Зареєструватися"
  await page.click('button:has-text("Зареєструватися")');

  // Перевірка, що користувача авторизовано
  await expect(page).toHaveURL(`http://localhost:5173${ROUTES.DASHBOARD}`);
});

test('Перевірка неактивності кнопки реєстрації при пустих полях вводу форми реєстрації', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.REGISTER}`);

  // Перевірка, що кнопка вимкнена, коли поля порожні
  await expect(
    page.locator('button:has-text("Зареєструватися")')
  ).toBeDisabled();
});

test('Перевірка неактивності кнопки реєстрації при некоректному вводі електронної адреси користувача у формі реєстрації', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.REGISTER}`);

  // Заповнення полів форми з неправильним форматом електронної пошти
  await page.fill('input[name="firstName"]', 'Іван');
  await page.fill('input[name="lastName"]', 'Петров');
  await page.fill('input[name="email"]', 'invalid-email');
  await page.fill('input[name="password"]', 'password123');

  // Перевірка, що кнопка залишається вимкненою
  await expect(
    page.locator('button:has-text("Зареєструватися")')
  ).toBeDisabled();
});

test('Перевірка неактивності кнопки реєстрації при некоректному вводі паролю користувача у формі реєстрації', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.REGISTER}`);

  // Заповнення полів форми з коротким паролем
  await page.fill('input[name="firstName"]', 'Іван');
  await page.fill('input[name="lastName"]', 'Петров');
  await page.fill('input[name="email"]', 'ivan.petrov@example.com');
  await page.fill('input[name="password"]', 'short');

  // Перевірка, що кнопка залишається вимкненою
  await expect(
    page.locator('button:has-text("Зареєструватися")')
  ).toBeDisabled();
});

test('Перевірка неактивності кнопки реєстрації при використанні спеціальних символів в полях форми реєстрації', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.REGISTER}`);

  // Заповнення полів форми з спеціальними символами
  await page.fill('input[name="firstName"]', '!@#$%^&*()_+');
  await page.fill('input[name="lastName"]', '!@#$%^&*()_+');
  await page.fill('input[name="email"]', '!@#$%^&*()_+');
  await page.fill('input[name="password"]', '!@#$%^&*()_+');

  // Перевірка, що кнопка залишається вимкненою
  await expect(
    page.locator('button:has-text("Зареєструватися")')
  ).toBeDisabled();
});

test('Перевірка активності кнопки реєстрації при використанні символів кирилиці в полях імені та прізвища користувача в формі реєстрації', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.REGISTER}`);

  // Заповнення полів форми з кириличними символами
  await page.fill('input[name="firstName"]', 'Іван');
  await page.fill('input[name="lastName"]', 'Петров');
  await page.fill('input[name="email"]', 'ivan.petrov@example.com');
  await page.fill('input[name="password"]', 'password123');

  // Перевірка, що кнопка ввімкнена
  await expect(
    page.locator('button:has-text("Зареєструватися")')
  ).toBeEnabled();
});

test('Перевірка активності кнопки реєстрації при використанні цифер в полях імені та прізвища користувача в формі реєстрації', async ({
  page,
}) => {
  await page.goto(`http://localhost:5173${ROUTES.REGISTER}`);

  // Заповнення полів форми з цифрами
  await page.fill('input[name="firstName"]', '1234567890');
  await page.fill('input[name="lastName"]', '1234567890');
  await page.fill('input[name="email"]', 'ivan.petrov@example.com');
  await page.fill('input[name="password"]', 'password123');

  // Перевірка, що кнопка ввімкнена
  await expect(
    page.locator('button:has-text("Зареєструватися")')
  ).toBeEnabled();
});

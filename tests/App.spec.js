import { test, expect } from "@playwright/test";
import { email, password, incorrectEmail } from "./user";

test("Проверка успешности авторизации", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await Promise.all([
    page.waitForSelector('input[name="email"]'),
    page.waitForSelector('input[name="password"]'),
    page.waitForSelector('[data-testid="login-submit-btn"]'),
  ]);

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('[data-testid="login-submit-btn"]');

  await page.waitForSelector(
    "h2.src-components-pages-Profile-Programs--title--Kw5NH"
  );
  const isProfilePageVisible = await page.isVisible(
    "h2.src-components-pages-Profile-Programs--title--Kw5NH"
  );
  expect(isProfilePageVisible).toBeTruthy();
});

test("Проверка авторизации с неверным email", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await Promise.all([
    page.waitForSelector('input[name="email"]'),
    page.waitForSelector('input[name="password"]'),
    page.waitForSelector('[data-testid="login-submit-btn"]'),
  ]);

  await page.fill('input[name="email"]', incorrectEmail);
  await page.fill('input[name="password"]', password);
  await page.click('[data-testid="login-submit-btn"]');

  await page.waitForSelector("span");
  const errorMessage = await page.textContent("span");
  expect(errorMessage).toBe("Неверный email");
});

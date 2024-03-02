import * as puppeteer from 'puppeteer';

let browser: puppeteer.Browser;
let page: puppeteer.Page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:3000'); // Update the URL if your app is served at a different location
});

afterAll(async () => {
  await browser.close();
});

describe('Automated Functional UI Test - Calculator Component', () => {
  it('should render without crashing', async () => {
    const calculatorElement = await page.$eval('.calculator', (el: Element) => el.textContent);
    expect(calculatorElement).toBeTruthy();
  });

  it('should display numbers on button click', async () => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("3")');

    const inputElement = await page.$eval('.display input', (el: HTMLInputElement) => el.value);
    expect(inputElement).toBe('123');
  });

  it('should handle basic arithmetic operations', async () => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');

    const resultElement = await page.$eval('.result', (el: Element) => el.textContent);
    expect(resultElement).toBe('Result: 3');
  });

  it('should truncate extra digits after the second decimal place', async () => {
    await page.click('button:has-text("5")');
    await page.click('button:has-text("/")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');

    const resultElement = await page.$eval('.result', (el: Element) => el.textContent);
    expect(resultElement).toBe('Result: 1.67');
  });

  it('should throw an error for out-of-range results', async () => {
    await page.click('button:has-text("9")');
    await page.click('button:has-text("9")');
    await page.click('button:has-text("9")');
    await page.click('button:has-text("9")');
    await page.click('button:has-text("9")');
    await page.click('button:has-text(".")');
    await page.click('button:has-text("9")');
    await page.click('button:has-text("=")');

    const errorElement = await page.$eval('.error', (el: Element) => el.textContent);
    expect(errorElement).toBe('Error: Invalid input or out of range');
  });

  // Add more automated test cases for other functionalities...
});

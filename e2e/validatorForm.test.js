import puppeteer from "puppeteer";
describe("Page start", () => {
  let browser;
  let page;
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });

  test('incorrect data', async() => {
    await page.goto('http://localhost:9000');
    await page.waitForSelector('.blog-wrapper');

    const formBlog = await page.$('.post-form'); 
    const textArea = await formBlog.$('.post-textarea');
    const buttonSubmit = await formBlog.$('.button-submit');
    await textArea.type('text');

    await buttonSubmit.click();



  });

  afterEach(async () => {
    await browser.close();
  });
});
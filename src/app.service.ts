import { Injectable } from '@nestjs/common';
const pt = require('puppeteer');

@Injectable()
export class AppService {
  async getResponse(url) {
    try {
      const browser = await pt.launch()
      const page = await browser.newPage()
      await page.goto(url.url, {
        waitUntil: 'networkidle0',
      })
      const pageData = await page.$("#data")
      const text = await (await pageData.getProperty('textContent')).jsonValue()
      await browser.close();

      return text;
    }
    catch (e) {
      return e.message;
    }
  }
}

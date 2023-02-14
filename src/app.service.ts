import { Injectable } from '@nestjs/common';
const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const { executablePath } = require("puppeteer");

@Injectable()
export class AppService {
  async getResponse(url) {
    try {
      let blockData: string;
      puppeteer.use(pluginStealth());
      await puppeteer.launch({ executablePath: executablePath() }).then(async browser => {
        const page = await browser.newPage();
        await page.goto(url.url, {
          waitUntil: 'networkidle0'
        });
        const pageData = await page.$("#data")
        blockData = await (await pageData.getProperty('textContent')).jsonValue()
        await browser.close();
      });
      return blockData;
    }
    catch (e) {
      return e.message;
    }
  }
}

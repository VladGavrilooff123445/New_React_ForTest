const puppeteer = require("puppeteer");
//const CaptchaSolver = require('captcha-solver')

const express = require('express');



const router = express.Router();

let db = [];
router.get('/product', (req, res, next) => {
  res.status(200).json(
      {product: db}
  )
});

router.post('/user_name', (req, res, next) => {
 //console.log(req);
  Puppeteer(req.body.login, req.body.password);
  res.status(200).json(
      {product: db}
  )
});

async function  Puppeteer(root, pass){
    const browser = await puppeteer.launch({headless: false, args: [
            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36',
            '--useChrome: true',
            '--window-size=1200,800',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--no-proxy-server',
            '--unlimited-storage',
            '--full-memory-crash-report',
            '--lang=en-US'
        ], stealth: true});
    const page = await browser.newPage();
    await page.goto('https://rozetka.com.ua/ua/');
    await page.click(`body > app-root > div > div:nth-child(3) > rz-header > header > div > div > ul > li.header-actions__item.header-actions__item--user > rz-user > button`, {clickCount: 2});
    await page.click('#auth_email');
    await page.waitForTimeout(1000);
    await page.type('#auth_email', root, {delay:500});
    await page.click('#auth_pass');
    await page.waitForTimeout(1000);
    await page.type('#auth_pass', pass, {delay:500});
    await page.click('body > app-root > single-modal-window > div.modal__holder.modal__holder_show_animation.modal__holder_size_medium > div.modal__content > user-identification > auth > div > form > fieldset > div.form__row.auth-modal__form-bottom > button', {clickCount: 1});
    await page.waitForTimeout(3000)
    await page.click('#recaptcha-anchor.div.recaptcha-checkbox-border', {clickCount: 1})
    //const solver = new CaptchaSolver('browser')
    //const codes = await solver.getTaskResult('#recaptcha-anchor > div.recaptcha-checkbox-border', {retries: 10})
    await page.waitForTimeout(90000)
    await browser.close();
}

module.exports = router;

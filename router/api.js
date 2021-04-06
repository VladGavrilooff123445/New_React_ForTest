const puppeteer = require("puppeteer");
const Apify = require('apify');

const express = require('express');



const router = express.Router();

let db = [];
router.get('/product', (req, res, next) => {
  res.status(200).json(
      {product: db}
  )
});

router.post('/user_name', (req, res, next) => {
    Apify.main(async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://elmir.ua/');
        await page.waitForTimeout(1500);
        await page.waitForSelector('#autho > span');
        await page.click('#autho > span', {clickCount: 1} );
        await page.click('#login-form > form > input');
        await page.waitForTimeout(1000);
        await page.type('#login-form > form > input', req.body.login, {delay:500});
        await page.click('#login-form > form > div:nth-child(3) > input');
        await page.waitForTimeout(1000);
        await page.type('#login-form > form > div:nth-child(3) > input', req.body.password, {delay:500});
        await page.click('#login-form > form > button', {clickCount: 1});
        await page.waitForTimeout(1500);
        await page.click('div > .menulist a > svg ');
        await page.waitForTimeout(1500);
        await page.click('div > .menulist ul > li > a');
        await page.waitForTimeout(1500);
        const name = await page.evaluate(() =>{
            return  document.getElementById('name').value;
        } );
        const surname = await page.evaluate(()=>{
            return document.getElementById('surname').value;
        });
        const result = surname + ' ' + name;

        res.status(200).json(
            {date: result}
        )
    });
});


module.exports = router

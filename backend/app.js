
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



const puppeteer = require('puppeteer');


(async () => {

  const defaultTimeout = 5000;
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.tuni.fi/opiskelijanopas/opintotiedot/opintojaksot/?year=2023&size=50');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});


  //const displayFiftySelector = 'page-size-50';
  //await page.waitForSelector(displayFiftySelector);
  //await page.click(displayFiftySelector);

  //await page.waitForTimeout(defaultTimeout);
  //const radioSelector = 'input#page-size-50';
  //console.log(radioSelector);
  //await page.waitForSelector(radioSelector, {visible:true, timeout:5000});
  //await page.click('input#page-size-50');
  //await page.waitForTimeout(3000);


  const moreSelector ='.sc-bdVaJa.sc-EHOje.sc-13iuobc-0.bgjxSN';

  const courseSelector = '.sc-bdVaJa.sc-1t7n2sp-2.laxuH';

  const codeSelector = '.sc-bdVaJa.sc-8sw1nw-0.eLXybm'

  for (let i = 0; i < 7; i++) {
    await page.waitForTimeout(defaultTimeout);
    await page.waitForSelector(moreSelector, {visible:true, timeout:5000});
    await page.click(moreSelector);
    console.log(i);
    await page.waitForSelector(courseSelector);

    const elements = await page.$$eval(courseSelector, (elements) => {
    return elements.map((element) => element.textContent);
  });

    console.log(elements);
  }


  console.log(elements);

  // Type into search box
  //await page.type('.search-box__input', 'automate beyond recorder');

  // Wait and click on first result
  //const searchResultSelector = '.search-box__link';
  //await page.waitForSelector(searchResultSelector);
  //await page.click(searchResultSelector);

  // Locate the full title with a unique string
  //const textSelector = await page.waitForSelector(
  //  'text/Customize and automate'
  //);
  //const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('jee');

  await browser.close();
})();

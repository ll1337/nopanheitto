
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
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.tuni.fi/opiskelijanopas/opintotiedot/opintojaksot/?year=2023');

  // Set screen size
  //await page.setViewport({width: 1080, height: 1024});
  //const links = await page.$$eval('a[href^="/opiskelijanopas/opintotiedot/opintojaksot/otm-acbfc47e-10dc-450f-9580-7152e90acc70?year=2023"]', (elements) => {
  //      return elements.map((element) => element.textContent);
  //  });

  const lamaSelector = '.sc-bdVaJa.sc-1t7n2sp-2.laxuH';
  await page.waitForSelector(lamaSelector);

      const elements = await page.$$eval('.sc-bdVaJa.sc-1t7n2sp-2.laxuH', (elements) => {
        return elements.map((element) => element.textContent);
    });

    console.log(elements);
//   console.log(links);
	console.log(lamaSelector);
	console.log(lamaSelector.textContent);

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

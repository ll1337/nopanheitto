const puppeteer = require('puppeteer');
const fs = require('fs');

// tähä consti js objekti missä:
// kurssikoodi: {
//  kurssiNimi: 'Raha talous raha II'
//  kurssiL(inn)kki: '/opintojaksot/kafsjlaghi3b
//}
// si vaa pushataan kaikki tolla formaatille uudella loadilla.
// tuolta noista xSelector vakioista löytyy about kaikki luokat mitä tarvii

(async () => {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();

    await page.setViewport({width: 1080, height: 1024});

    await page.goto('https://www.tuni.fi/opiskelijanopas/opintotiedot/opintojaksot/?year=2023&studyLevel=basic-studies&size=50');

    // lataa sivulle lisää tuloksia
    const moreSelector ='.sc-bdVaJa.sc-EHOje.sc-13iuobc-0.bgjxSN';

    // kurssin nimi, sama <a> sisältää myös linkin kurssiin hrefis
    const courseSelector = '.sc-bdVaJa.sc-1t7n2sp-2.laxuH';

    // kurssin koodi, textContentilla saa
    const codeSelector = '.sc-bdVaJa.sc-8sw1nw-0.eLXybm'

    // "oLeT pÄäSsYt LiStAn LoPpUun"
    const eofSelector = '.sc-bdVaJa.sc-13iuobc-1.jnhQcf'

    const defaultTimeout = 10000;

    let courses;
    
    while (true) {
        await page.waitForSelector(courseSelector);
        //console.log(Array.from(document.querySelectorAll(codeSelector)))
        console.log('looppi');
        // getAttribute('href');

        const eof = await page.$(eofSelector);

        if (eof) {
            console.log('loppuun päästiin gg');
            const elements = await page.$$eval(courseSelector, (elements) => {
                return elements.map((element) => element.textContent);
            });
            courses = elements;
            break;
        }

        //new Promise(r => setTimeout(r, defaultTimeout));
        //await page.waitForTimeout(defaultTimeout);

        //await page.waitForFunction(
        //    (targetClassName, expectedChildCount) => {
            // Find the target element by class name
        //    const targetElement = document.querySelector(`.${targetClassName}`);

            // Check if the target element exists and has the expected number of children
        //    return targetElement && targetElement.children.length >= expectedChildCount;
        //    },
        //    {},
            //targetClassName,
        //    3 // Replace 3 with the desired number of children
        //);
        await page.waitForSelector(moreSelector, {visible:true, timeout:5000});

        const moreButton = await page.$(moreSelector);
        if (moreButton) {
            await page.click(moreSelector);
        }
    }

    // Convert the array to a string (you can customize this based on your array structure)
    const arrayString = courses.join('\n'); // This example uses a newline character as a separator

    // Specify the file path
    const filePath = 'output.txt';

    // Write the array content to the file
    fs.writeFile(filePath, arrayString, (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log(`Array content has been written to ${filePath}`);
    }
    });

    await browser.close();
})();
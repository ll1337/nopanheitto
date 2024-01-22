const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();

    await page.setViewport({width: 1080, height: 1024});

    await page.goto('https://www.tuni.fi/opiskelijanopas/opintotiedot/opintojaksot/?year=2023&studyLevel=basic-studies&size=50');

    const moreSelector ='.sc-bdVaJa.sc-EHOje.sc-13iuobc-0.bgjxSN';
    const courseSelector = '.sc-bdVaJa.sc-1t7n2sp-2.laxuH';
    const codeSelector = '.sc-bdVaJa.sc-8sw1nw-0.eLXybm'
    // Define the target class name
    const targetClassName = 'sc-bdVaJa i5k75b-0 fKrXNRsc-bdVaJa';

    // Use page.evaluate to access the document object and log the number of children
    const result = await page.evaluate((targetClassName) => {
        const targetElement = document.querySelector(`.${targetClassName}`);
        const childCount = targetElement ? targetElement.children.length : 0;

        console.log(`Element with class ${targetClassName} has ${childCount} children.`);

        return childCount;
    }, targetClassName);

    const defaultTimeout = 10000;

    let courses;

    for (let i = 0; i < 30; i++) {
        //new Promise(r => setTimeout(r, defaultTimeout));
        await page.waitForTimeout(defaultTimeout);

        //let desiredChildCount = 

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
        //await page.waitForSelector(moreSelector, {visible:true, timeout:100000});
        const moreButton = await page.$(moreSelector);
        if (moreButton) {
            await page.click(moreSelector);
        }
        console.log(i);
        await page.waitForSelector(courseSelector);

        const elements = await page.$$eval(courseSelector, (elements) => {
            return elements.map((element) => element.textContent);
        });

        if (i==9) {
            courses = elements;
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
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();

    await page.setViewport({width: 1080, height: 1024});

    await page.goto('https://www.tuni.fi/opiskelijanopas/opintotiedot/opintojaksot/?year=2023&studyLevel=basic-studies&size=50');
    //await page.goto('https://www.tuni.fi/opiskelijanopas/opintotiedot/opintojaksot/?year=2023&size=50');

    // lataa sivulle lisää tuloksia
    const moreSelector ='.sc-bdVaJa.sc-EHOje.sc-13iuobc-0.bgjxSN';

    // Itse kurssien laatikot, 2 erilaista väristä riippuen
    //const courseSelector = ".sc-bdVaJa sc-135i1ze-0.curriculum-search-result.iHLkz"
    //const courseSelectorDark = ".sc-bdVaJa.sc-135i1ze-0.curriculum-search-result.giFiGk"


    // kurssin koodi, textContentilla saa
    //const codeSelector = '.sc-bdVaJa.sc-8sw1nw-0.eLXybm';
    //const codeSelectorDifferent = 'sc-bdVaJa sc-8sw1nw-0 eLXybm';

    // "oLeT pÄäSsYt LiStAn LoPpUun"
    const eofSelector = '.sc-bdVaJa.sc-13iuobc-1.jnhQcf';

    const defaultTimeout = 10000;


    
    while (true) {

        const eof = await page.$(eofSelector);

        if (eof) {
            console.log('loppuun päästiin gg');
            //const elements = await page.$$eval(courseNameSelector, (elements) => {
                //return elements.map((element) => element.textContent);
            //});  



            const result = await page.evaluate(() => {
                let courseUnitDivs = document.querySelectorAll('div[type="course-units"]');
                //let textContentsArray = [];

                const courses = {};
                // kurssin nimi, sama <a> sisältää myös linkin kurssiin hrefis
                const courseNameSelector = '.sc-bdVaJa.sc-1t7n2sp-2.laxuH';

                let skipFirst = true;

                courseUnitDivs.forEach(function(element) {
                    if (!skipFirst) {
                    
                        // Get the first child element
                        let firstChild = element.firstElementChild;

                        // Get the text content of the first child
                        let courseCode = firstChild.textContent;

                        let secondChild = element.children[1];

                        let courseObject = {
                            courseName: secondChild.textContent,
                            courseLink: secondChild.children[0].children[0].children[0].getAttribute("href"),
                            courseCredits: element.children[2].textContent
                            //course
                        };

                        courses[courseCode] = courseObject;
                    }
                    else skipFirst = false;
                });
                return courses;
            });

            const jsonData = JSON.stringify(result, null, 4);

            const filePath = 'courses/output.json'

            
            // Write the JSON string to a file
            fs.writeFile(filePath, jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
                console.log('Data has been saved to', filePath);
            });

            break;
        }

        await page.waitForSelector(moreSelector, {visible:true, timeout:5000});

        const moreButton = await page.$(moreSelector);
        if (moreButton) {
            await page.click(moreSelector);
        }
    }

/*     // Convert the array to a string (you can customize this based on your array structure)
    const arrayString = courses.join('\n'); // This example uses a newline character as a separator

    // Specify the file path
    const filePath = 'output.txt'; */

/*     // Write the array content to the file
    fs.writeFile(filePath, arrayString, (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log(`Array content has been written to ${filePath}`);
    }
    }); */

    await browser.close();
})();
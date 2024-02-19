const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();

    await page.setViewport({width: 1080, height: 1024});

    // For the final version, either go through all the courses or in parts of studyLevel
    await page.goto('https://www.tuni.fi/opiskelijanopas/opintotiedot/opintojaksot/?year=2023&studyLevel=basic-studies&size=50');
    //await page.goto('https://www.tuni.fi/opiskelijanopas/opintotiedot/opintojaksot/?year=2023&size=50');

    // CSS Class of the "load more results" button
    const moreSelector ='.sc-bdVaJa.sc-EHOje.sc-13iuobc-0.bgjxSN';

    // CSS Class of the "you have reached the end of the list" text.
    const eofSelector = '.sc-bdVaJa.sc-13iuobc-1.jnhQcf';

    // Main loop of the Scraper
    while (true) {

        // Indicates if we have reached the end of the page i.e there is no more results to show
        const eof = await page.$(eofSelector);

        if (eof) {
            console.log('-- The Scraper has reached the end --');

            // puppeteer's page.evaluate for saving all course info
            const result = await page.evaluate(() => {
                // Course "units": div containing all data of a singular course
                let courseUnitDivs = document.querySelectorAll('div[type="course-units"]');

                // Main array for the courses.
                const courses = [];

                // The first result contains navigation data etc. and should be skipped
                let skipFirst = true;

                courseUnitDivs.forEach(function(element) {
                    if (!skipFirst) {
                    
                        // Get the first child element
                        let firstChild = element.firstElementChild;

                        // Get the text content of the first child, contains course code
                        let courseCode = firstChild.textContent;

                        // Contains course name and course href link
                        let secondChild = element.children[1];

                        let courseObject = {
                            courseName: secondChild.textContent,
                            courseLink: secondChild.children[0].children[0].children[0].getAttribute("href"), // :D 
                            courseCredits: element.children[2].textContent
                        };

                        // Course code is unique and therefore acts as a nice key for a course
                        courses.push({ [courseCode]: courseObject });
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
                console.log('Course data has been saved to', filePath);
            });

            break;
        }

        // Wait for the "load more courses" button to be visible and click it.
        await page.waitForSelector(moreSelector, {visible:true, timeout:5000});

        const moreButton = await page.$(moreSelector);
        if (moreButton) {
            await page.click(moreSelector);
        }
    }

    await browser.close();
})();
const puppeteer = require('puppeteer');

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
        console.log('looppi');
        // getAttribute('href');


        const eof = await page.$(eofSelector);

        if (eof) {
            console.log('loppuun päästiin gg');
            //const elements = await page.$$eval(courseNameSelector, (elements) => {
                //return elements.map((element) => element.textContent);
            //});  




            let logAss;
            let logAss2;
            let logAss3;


            const result = await page.evaluate(() => {
                let courseUnitDivs = document.querySelectorAll('div[type="course-units"]');
                //let textContentsArray = [];

                const courses = {};
                // kurssin nimi, sama <a> sisältää myös linkin kurssiin hrefis
                const courseNameSelector = '.sc-bdVaJa.sc-1t7n2sp-2.laxuH';

                courseUnitDivs.forEach(function(element) {
                    //textContentsArray.push(element.textContent);
                    
                    // Get the first child element
                    let firstChild = element.firstElementChild;

                    // Get the text content of the first child
                    let courseCode = firstChild.textContent;

                    let secondChild = element.children[1];

                    let courseObject = {
                            courseName: secondChild.textContent,
                            //courseLink:
                            //courseCredits:
                            //course
                    };

                    courses[courseCode] = courseObject;
                });
                return courses;
            });
            delete result["Opinto­jakson yksilöivä koodiKoodiKlikkaa järjestääksesi opinto­jaksot koodin mukaan, aakkosjärjestyksessä"];
            console.log(logAss);
            console.log(logAss2);
            console.log(logAss3);
            console.log(result);
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
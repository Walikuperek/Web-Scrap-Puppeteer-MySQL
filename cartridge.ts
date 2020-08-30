import { db } from './db.config';
const puppeteer = require('puppeteer-core');


export default class Cartridge {
    constructor(url: string) {
        this.kwadronScrapCartridge(url);
    }

    async kwadronScrapCartridge(url: string) {
        try {
            if (url === undefined || url === '') return;

            const browser = await puppeteer.launch({
                'product': 'chrome',
                'executablePath': "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
            });
            const page = await browser.newPage();
            await page.goto(url);

            // h1
            let [elHeader] = await page.$x('/html/body/div[1]/div[2]/div/div/div/div[1]/div/div[1]/div[2]/h1');
            if (elHeader === undefined) {
                [elHeader] = await page.$x('/html/body/div[2]/div[2]/div/div/div/div[1]/div/div[1]/div[2]/h1');
                console.log({ elHeader: elHeader });
            }

            let textHeader = '';
            if (elHeader === undefined) {
                textHeader = 'brak';
            } else {
                const header = await elHeader.getProperty('textContent');
                textHeader = await header.jsonValue();
            }

            // img
            let [elImg] = await page.$x('/html/body/div[2]/div[2]/div/div/div/div[1]/div/div[1]/div[1]/div/div[1]/span/img');
            if (elImg === undefined) {
                console.log({ elImg: elImg });
                [elImg] = await page.$x('/html/body/div[1]/div[2]/div/div/div/div[1]/div/div[1]/div[1]/div/div[1]/span/img');
            }
          
            let srcImg = '';
            if (elImg === undefined) {
                srcImg = '-';
            } else {
                const src = await elImg.getProperty('src');
                srcImg = await src.jsonValue();
            }

            // description
            let [elTextDescribe] = await page.$x('/html/body/div[2]/div[2]/div/div/div/div[1]/div/div[1]/div[2]/form/div/div[1]/div/p');

            if (elTextDescribe === undefined) {
                console.log({ elTextDescribe: elTextDescribe });
                [elTextDescribe] = await page.$x('/html/body/div[1]/div[2]/div/div/div/div[1]/div/div[1]/div[2]/form/div/div[1]/div/div/div/div/div/p[1]');
            }
            if (elTextDescribe === undefined) {
                console.log({ elTextDescribe: elTextDescribe });
                [elTextDescribe] = await page.$x('//*[@id="short_description_content"]/p');
            }
            
            let text = '';
            if (elTextDescribe === undefined) {
                text = '-';
            } else {
                const textDescribe = await elTextDescribe.getProperty('textContent');
                text = await textDescribe.jsonValue();
            }

            // netto
            let [elPriceNetto] = await page.$x('//*[@id="buy_block"]/div/div[3]/div[1]/div/p[1]/span[2]/span');
            // 
            
            if (elPriceNetto === undefined) {
                console.log({ elPriceNetto: elPriceNetto });
                [elPriceNetto] = await page.$x('/html/body/div[1]/div[2]/div/div/div/div[1]/div/div[1]/div[2]/form/div/div[3]/div[2]/div/p[1]/span[2]/span');
            }
            

            let textPriceNetto = '';
            if (elPriceNetto === undefined) {
                textPriceNetto = '-';
            } else {
                const textDescribe = await elPriceNetto.getProperty('textContent');
                textPriceNetto = await textDescribe.jsonValue();
            }


            // brutto
            let [elPriceBrutto] = await page.$x('/html/body/div[2]/div[2]/div/div/div/div[1]/div/div[1]/div[2]/form/div/div[3]/div[1]/div/p[1]/span[1]');
            if (elPriceBrutto === undefined) {
                console.log({ elPriceBrutto: elPriceBrutto });
                [elPriceBrutto] = await page.$x('//*[@id="our_price_display"]');
            }

            let textPriceBrutto = '';
            if (elPriceBrutto === undefined) {
                textPriceBrutto = '-';
            } else  {
                const price = await elPriceBrutto.getProperty('textContent');
                textPriceBrutto = await price.jsonValue();
            }

            console.log(`'${textHeader}', '${srcImg}', '${text}', '${textPriceNetto}', '${textPriceBrutto}', '${url}'`);

            db.query(
                `INSERT INTO cartridges (ID, Shop, Name, ImgSrc, Description, PriceNetto, PriceBrutto, Link) 
            VALUES (null, 'KWADRON', '${textHeader}', '${srcImg}', '${text}', '${textPriceNetto}', '${textPriceBrutto}', '${url}')`,
                (err, results, fields) => {
                    if (err) {
                        console.log(`
                        * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \n
                        ERROR
                        * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \n
                        `);
                        console.log({ err });
                        console.log({ url: url });
                        console.log({ fields });
                        // throw err;
                    }
                    console.log({ results });
                }
            );

            browser.close();
        }
        catch (error) {
            console.log(`
            * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \n
            ERROR
            * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \n
            `);
            console.log({ url: url });
            console.log(error);
        }
    }
}
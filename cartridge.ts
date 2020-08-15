import { db } from './index';
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

            const [elHeader] = await page.$x('//*[@id="center_column"]/div/div[1]/div[2]/h1');
            const header = await elHeader.getProperty('textContent');
            const textHeader = await header.jsonValue();

            const [elImg] = await page.$x('/html/body/div[2]/div[2]/div/div/div/div[1]/div/div[1]/div[1]/div/div[1]/span/img');
            const src = await elImg.getProperty('src');
            const srcImg = await src.jsonValue();

            const [elTextDescribe] = await page.$x('//*[@id="short_description_content"]/p');
            const textDescribe = await elTextDescribe.getProperty('textContent');
            const text = await textDescribe.jsonValue();

            const [elPriceNetto] = await page.$x('//*[@id="buy_block"]/div/div[3]/div[2]/div/p[1]/span[2]/span');
            const priceNetto = await elPriceNetto.getProperty('textContent');
            const textPriceNetto = await priceNetto.jsonValue();

            const [elPrice] = await page.$x('//*[@id="our_price_display"]');
            const price = await elPrice.getProperty('textContent');
            const textPriceBrutto = await price.jsonValue();

            db.query(
                `INSERT INTO cartridges (ID, Shop, Name, ImgSrc, Description, PriceNetto, PriceBrutto, Link) 
            VALUES (null, 'KWADRON', '${textHeader}', '${srcImg}', '${text}', '${textPriceNetto}', '${textPriceBrutto}', '${url}')`,
                (err, results, fields) => {
                    if (err) throw err;
                    console.log({ results });
                }
            );

            browser.close();
        }
        catch (error) {
            console.log(error);
        }
    }
}
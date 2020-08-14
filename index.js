const mysql = require('mysql2');
const puppeteer = require('puppeteer-core');

process.setMaxListeners(0);
let counter = 0;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});

/** 
 * @template STRUCTURE OF DB
 * 
 * |##__________DB: inventory
 * |
 * |#________TABLE: cartridges
 * |____________ID: AI PRIMARY KEY
 * |__________Shop: STRING
 * |__________Name: STRING
 * |________ImgSrc: STRING
 * |___Description: STRING
 * |____PriceNetto: STRING
 * |___PriceBrutto: STRING
 * |________Amount: NUMBER
 */

db.query(
    `SELECT * FROM cartridges`,
    (err, results, fields) => {
        if (err) throw err;

        console.log({ results });
    }
);


class Cartridge {
    constructor(url) {
        this.kwadronScrapCartridge(url);
    }

    async kwadronScrapCartridge(url) {
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
                `INSERT INTO cartridges (ID, Shop, Name, ImgSrc, Description, PriceNetto, PriceBrutto, Amount) 
                VALUES (null, 'KWADRON', '${textHeader}', '${srcImg}', '${text}', '${textPriceNetto}', '${textPriceBrutto}', 0)`,
                (err, results, fields) => {
                    if (err) throw err;

                    console.log({ results });
                }
            );

            browser.close();
        }
        catch (error) {
            console.log(error)
        }
    }
}

const CARTRIDGES_URLS_I = [
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-025mm-rl-round-liner-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-025mm-rs-round-shader-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-025mm-mg-magnum-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-sublime-025mm-mg-magnum-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-025mm-sem-soft-edge-magnum-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-030mm-rl-round-liner-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-030mm-rs-round-shader-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-030mm-mg-magnum-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-sublime-030mm-mg-magnum-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-030mm-sem-soft-edge-magnum-1szt.html',
];

const CARTRIDGES_URLS_II = [
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-sublime-030mm-sem-soft-edge-magnum-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-rl-round-liner-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-trl-turbo-round-liner-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-erl-empty-round-liner-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-rs-round-shader-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-mg-magnum-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-rl-t-round-liner-textured-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-sem-soft-edge-magnum-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-sublime-035mm-mg-magnum-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-sublime-035mm-sem-soft-edge-magnum-1szt.html',
];

const CARTRIDGES_URLS_III = [
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-fl-flat-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-sublime-025mm-fl-flat-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-rl-round-liner-medium-taper-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-rs-round-shader-medium-taper-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-mg-magnum-medium-taper-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-sem-soft-edge-magnum-medium-taper-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-pmu-optima-cartridges-025mm-rl-round-liner-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-pmu-optima-cartridges-030mm-rl-round-liner-1szt.html',
];

setInterval(() => {
    counter++;
    console.log(`Time: ${counter}s`);
}, 1000);

CARTRIDGES_URLS_I.forEach(element => {
    let x = new Cartridge(element);
});

setTimeout(() => {
    CARTRIDGES_URLS_II.forEach(element => {
        let x = new Cartridge(element);
    });
}, 30_000);

setTimeout(() => {
    CARTRIDGES_URLS_III.forEach(element => {
        let x = new Cartridge(element);
    });
}, 60_000);

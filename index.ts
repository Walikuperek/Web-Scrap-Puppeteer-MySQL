import Cartridge from './cartridge';
import { db } from './db.config';
import { ARRAY_OF_ARRAYS_OF_URLS } from './kwadron-url';

const setConsoleTimerTick = () => {
    let counter: number = 0;
    setInterval(() => {
        counter++;
        console.log(`Time: ${counter}s`);
    }, 1000);
}
    
const fillDatabase = () => {

    let index: number = 1;
    let timeDelay = 13_000;
    ARRAY_OF_ARRAYS_OF_URLS[index - 1].map(el => {
        console.log({ el: el });
        new Cartridge(el);
    });
    setInterval(() => {
        if (index >= ARRAY_OF_ARRAYS_OF_URLS.length) return;

        ARRAY_OF_ARRAYS_OF_URLS[index].map(el => {
            console.log({ el: el });
            new Cartridge(el);
        })
        index++;
    }, timeDelay);

}

const removeAllRecordsFromDatabase = () => {
    
    db.query(
        `DELETE FROM cartridges`,
        (err, results, fields) => {
            if (err) {
                console.table({ err: err })
                throw err;
            }

            console.log({ results });
        }
    );
}

const queryAll = () => {
    db.query(
        `SELECT * FROM cartridges`,
        (err, results, fields) => {
            if (err) throw err;

            console.log({ results });
        }
    );
}

/* * * * * DOCS * * * * *
```
tsc db.config.ts && tsc kwadron - url.ts && tsc cartridge.ts && tsc index.ts

node index.js
```
* * * * * * * * * * * * */

// Tics once per sec
setConsoleTimerTick();

// queryAll();

fillDatabase();

// removeAllRecordsFromDatabase();

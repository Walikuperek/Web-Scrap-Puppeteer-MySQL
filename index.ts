import Cartridge from './cartridge';
const mysql = require('mysql2');

process.setMaxListeners(0);
let counter = 0;

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});

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

const setConsoleTimerTick = () => {
    setInterval(() => {
        counter++;
        console.log(`Time: ${counter}s`);
    }, 1000);
}

const fillDatabase = () => {
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
}

const removeAllRecordsFromDatabase = (dblength) => {
    const dbLength = dblength;
    for (let i = 1; i < dbLength + 1; i++)
    db.query(
        `DELETE FROM cartridges WHERE ID = ${i}`,
        (err, results, fields) => {
            if (err) throw err;

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

// Tics once per sec
setConsoleTimerTick();

queryAll();

// fillDatabase();

// removeAllRecordsFromDatabase(200);

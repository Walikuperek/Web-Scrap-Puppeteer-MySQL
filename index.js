"use strict";
exports.__esModule = true;
exports.db = void 0;
var cartridge_1 = require("./cartridge");
var mysql = require('mysql2');
process.setMaxListeners(0);
var counter = 0;
exports.db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});
var CARTRIDGES_URLS_I = [
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
var CARTRIDGES_URLS_II = [
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
var CARTRIDGES_URLS_III = [
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-fl-flat-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-sublime-025mm-fl-flat-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-rl-round-liner-medium-taper-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-rs-round-shader-medium-taper-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-mg-magnum-medium-taper-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-sem-soft-edge-magnum-medium-taper-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-pmu-optima-cartridges-025mm-rl-round-liner-1szt.html',
    'https://www.kwadron.pl/pl/kwadron-pmu-optima-cartridges-030mm-rl-round-liner-1szt.html',
];
var setConsoleTimerTick = function () {
    setInterval(function () {
        counter++;
        console.log("Time: " + counter + "s");
    }, 1000);
};
var fillDatabase = function () {
    CARTRIDGES_URLS_I.forEach(function (element) {
        var x = new cartridge_1["default"](element);
    });
    setTimeout(function () {
        CARTRIDGES_URLS_II.forEach(function (element) {
            var x = new cartridge_1["default"](element);
        });
    }, 30000);
    setTimeout(function () {
        CARTRIDGES_URLS_III.forEach(function (element) {
            var x = new cartridge_1["default"](element);
        });
    }, 60000);
};
var removeAllRecordsFromDatabase = function (dblength) {
    var dbLength = dblength;
    for (var i = 1; i < dbLength + 1; i++)
        exports.db.query("DELETE FROM cartridges WHERE ID = " + i, function (err, results, fields) {
            if (err)
                throw err;
            console.log({ results: results });
        });
};
var queryAll = function () {
    exports.db.query("SELECT * FROM cartridges", function (err, results, fields) {
        if (err)
            throw err;
        console.log({ results: results });
    });
};
// Tics once per sec
setConsoleTimerTick();
queryAll();
// fillDatabase();
// removeAllRecordsFromDatabase(200);
/**
 * @template STRUCTURE OF DB
 *
 * |##__________DB: inventory
 * |
 * |#________TABLE: cartridges
 * |____________ID: INT(11) AI PRIMARY KEY
 * |__________Shop: STRING/TEXT
 * |__________Name: STRING/TEXT
 * |________ImgSrc: STRING/TEXT
 * |___Description: STRING/TEXT
 * |____PriceNetto: STRING/TEXT
 * |___PriceBrutto: STRING/TEXT
 * |__________Link: STRING/TEXT
 */ 
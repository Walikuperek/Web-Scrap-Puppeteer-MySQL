"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var index_1 = require("./index");
var puppeteer = require('puppeteer-core');
var Cartridge = /** @class */ (function () {
    function Cartridge(url) {
        this.kwadronScrapCartridge(url);
    }
    Cartridge.prototype.kwadronScrapCartridge = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var browser, page, elHeader, header, textHeader, elImg, src, srcImg, elTextDescribe, textDescribe, text, elPriceNetto, priceNetto, textPriceNetto, elPrice, price, textPriceBrutto, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 19, , 20]);
                        if (url === undefined || url === '')
                            return [2 /*return*/];
                        return [4 /*yield*/, puppeteer.launch({
                                'product': 'chrome',
                                'executablePath': "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
                            })];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _a.sent();
                        return [4 /*yield*/, page.goto(url)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.$x('//*[@id="center_column"]/div/div[1]/div[2]/h1')];
                    case 4:
                        elHeader = (_a.sent())[0];
                        return [4 /*yield*/, elHeader.getProperty('textContent')];
                    case 5:
                        header = _a.sent();
                        return [4 /*yield*/, header.jsonValue()];
                    case 6:
                        textHeader = _a.sent();
                        return [4 /*yield*/, page.$x('/html/body/div[2]/div[2]/div/div/div/div[1]/div/div[1]/div[1]/div/div[1]/span/img')];
                    case 7:
                        elImg = (_a.sent())[0];
                        return [4 /*yield*/, elImg.getProperty('src')];
                    case 8:
                        src = _a.sent();
                        return [4 /*yield*/, src.jsonValue()];
                    case 9:
                        srcImg = _a.sent();
                        return [4 /*yield*/, page.$x('//*[@id="short_description_content"]/p')];
                    case 10:
                        elTextDescribe = (_a.sent())[0];
                        return [4 /*yield*/, elTextDescribe.getProperty('textContent')];
                    case 11:
                        textDescribe = _a.sent();
                        return [4 /*yield*/, textDescribe.jsonValue()];
                    case 12:
                        text = _a.sent();
                        return [4 /*yield*/, page.$x('//*[@id="buy_block"]/div/div[3]/div[2]/div/p[1]/span[2]/span')];
                    case 13:
                        elPriceNetto = (_a.sent())[0];
                        return [4 /*yield*/, elPriceNetto.getProperty('textContent')];
                    case 14:
                        priceNetto = _a.sent();
                        return [4 /*yield*/, priceNetto.jsonValue()];
                    case 15:
                        textPriceNetto = _a.sent();
                        return [4 /*yield*/, page.$x('//*[@id="our_price_display"]')];
                    case 16:
                        elPrice = (_a.sent())[0];
                        return [4 /*yield*/, elPrice.getProperty('textContent')];
                    case 17:
                        price = _a.sent();
                        return [4 /*yield*/, price.jsonValue()];
                    case 18:
                        textPriceBrutto = _a.sent();
                        index_1.db.query("INSERT INTO cartridges (ID, Shop, Name, ImgSrc, Description, PriceNetto, PriceBrutto, Link) \n            VALUES (null, 'KWADRON', '" + textHeader + "', '" + srcImg + "', '" + text + "', '" + textPriceNetto + "', '" + textPriceBrutto + "', '" + url + "')", function (err, results, fields) {
                            if (err)
                                throw err;
                            console.log({ results: results });
                        });
                        browser.close();
                        return [3 /*break*/, 20];
                    case 19:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 20];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    return Cartridge;
}());
exports["default"] = Cartridge;

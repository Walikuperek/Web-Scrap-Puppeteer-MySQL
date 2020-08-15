# Web-Scrap-Puppeteer-MySQL
Scrap web page(tattoo shop) for products informations and INSERT them into the MySQL database.

# index.ts functions
  *     setConsoleTimerTick()           // Tics once per sec
  *     fillDatabase()                  // Fills database with scrapped informations, uses Cartridge class
  *     removeAllRecordsFromDatabase()  // Removes all records from database
  *     queryAll()                      // SQL query for all records in database

# cartridge.ts
  class Cartridge which open one Google Chrome via Puppeteer and scrap informations about product and inserts them into the database

# Structure of database

 *  __DB: inventory
 * |___TABLE: cartridges
 * |______________ID: INT(11) AI PRIMARY KEY
 * |___________Shop: STRING/TEXT
 * |___________Name: STRING/TEXT
 * |_________ImgSrc: STRING/TEXT
 * |____Description: STRING/TEXT
 * |_____PriceNetto: STRING/TEXT
 * |____PriceBrutto: STRING/TEXT
 * |___________Link: STRING/TEXT

# Example row from Database

*     TextRow
      { ID: 150,
       Shop: 'KWADRON',
       Name: 'KWADRON Cartridge System 0.35mm FL - Flat - 1szt',
       ImgSrc: 'https://www.kwadron.pl/6635-large_default/kwadron-cartridge-system-035mm-fl-flat-1szt.jpg',
       Description: 'Najwyższej jakości cartridge KWADRON o średnicy 0.35mm FL Flat. Cartridge dedykowane do cieniowania i wypełnień, idealne do dużych, szerokich powierzchni, szczególnie do geometrycznych form. Igły w tych cartridgach ułożone są w jednym rzędzie.',
       PriceNetto: '5,40 zł',
       PriceBrutto: '6,64 zł',
       Link: 'https://www.kwadron.pl/pl/kwadron-cartridge-system-035mm-fl-flat-1szt.html' }

const mysql = require('mysql2');

process.setMaxListeners(0);
export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});
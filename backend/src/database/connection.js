const mysql = require('mysql2/promise');

require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWD,
    database: process.env.MYSQL_NAME,
    port: process.env.MYSQL_PORT,
});

async function testConnection() {
    try {
        await connection.getConnection();
        console.log('Conexão com o MySQL estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar com o MySQL:', error.message);
    }
}

testConnection();

module.exports = connection;

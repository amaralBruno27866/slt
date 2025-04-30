/* eslint-disable no-undef */

import pool from './src/db/db.js';

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Conectado ao banco de dados com sucesso!');
        client.release();
        process.exit(0);
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }
}

testConnection();
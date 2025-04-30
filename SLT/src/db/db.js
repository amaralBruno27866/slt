/* eslint-disable no-undef */

// 1) Importa todo o pacote 'pg' como um objeto
import pkg from 'pg';

// 2) Importa o dotenv para carregar o .env
import dotenv from 'dotenv';

// 3) Carrega as variáveis do .env em process.env
dotenv.config();

// 4) Puxa o Pool (gestor de conexões) do objeto pkg
const { Pool } = pkg;

// 5) Lista de variáveis obrigatórias — evita erro de “undefined”
const requiredEnvVars = [
  'PGHOST',
  'PGPORT',
  'PGDATABASE',
  'PGUSER',
  'PGPASSWORD'
];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

// 6) Cria o pool de conexões
const pool = new Pool({
  host:     process.env.PGHOST,
  port:     Number(process.env.PGPORT),   // CONVERTENDO para number
  database: process.env.PGDATABASE,
  user:     process.env.PGUSER,
  password: process.env.PGPASSWORD
});

// 7) Testa a conexão logo ao rodar o app
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Connected to the database');
  }
  release();
});

// 8) Exporta o pool para usar em outros módulos
export default pool;

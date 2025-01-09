import pg from 'pg';

const { Pool } = pg;

// * Cadena de conexion a la base de datos
const connectionString = process.env.DATABASE_URL;

// * Configuracion a la base de datos
export const db = new Pool({
  allowExitOnIdle: true,
  connectionString
});

try {
  await db.query("select now()");
  console.log("Base de datos conectada jaja");
} catch (error) {
  console.log(error)
}
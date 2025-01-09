import { db } from "../database/connection.database.js";

// ? Funcion para crear un nuevo usuario
const create = async ({email, password, username}) => {
  try {
    const query = {
      text: `INSERT INTO users(email, password, username) values ($1 , $2, $3) RETURNING email, username, id`,
      values: [email, password, username]
    }
    const {rows} = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log(`Error creando el usuario en la base de datos ${error}`);
  }
}

// ? Funcion para buscar un usuario por email
const getUserByEmail = async (email) => {
  try {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email]
    }
    const {rows} = await db.query(query);
    return rows[0]
  } catch (error) {
    console.log(`Error buscando el usuario por email en la base de datos ${error}`);
  }
}

export const UserModel = {
  create,
  getUserByEmail
}
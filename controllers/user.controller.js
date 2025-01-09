import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.model.js";

// ? Funcion para el registro de un nuevo usuario
const register = async (request, response) => {
  try {
    // * Destructuracion del request de la peticion HTTP
    const {username, email, password} = request.body;

    // * Validacion de los campos del JSON
    if (!username || !email || !password) {
      return response.status(400).json({
        ok: false,
        msg: "Campos obligatorios nombre de usuario, email y contraseña"
      })
    }

    // * Verificar si existe un usuario con ese correo electronico
    const user = await UserModel.getUserByEmail(email);
    if (user) {
      return response.status(409).json({
        ok: false,
        msg: "El email ya existe"
      })
    }

    // * Hashear contraseña y crear usuario en la base de datos
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await UserModel.create({email, password: hashedPassword, username});

    // * Creacion del jwt para el token
    const token = jwt.sign({
      email: newUser.email
    }, process.env.JWT_SECRET, {expiresIn: "1h"})

    // * Devolver respuesta con el token
    return response.status(201).json({
      ok: true,
      msg: token,
    })
  } catch (error) {
    return response.status(500).json({
      ok: false,
      msg: "Error internal server"
    });
  }
}

// ? Funcion para el login
const login = async (request, response) => {
  try {
    // * Destructuracion de los datos del request
    const {email, password} = request.body;

    // * Validaciones de campos
    if (!email || !password) {
      return response.status(400).json({
        ok: false,
        msg: "Campos requeridos: Email, Contraseña"
      })
    }
    
    // * Funcion para buscar usuario por email
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      return response.status(404).json({
        ok: false,
        msg: "El usuario no existe"
      })
    }

    // * Verificar si la contraseña entrante es igual a la que esta en la base de datos
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return response.status(401).json({
        ok: false,
        msg: "Las contraseñas no coinciden"
      })
    }

    // * Creacion del token al momento de logearse
    const token = jwt.sign({
      email: user.email
    }, process.env.JWT_SECRET, {expiresIn: "1hr"})

    // * Retornar el token como respuesta al login
    return response.status(200).json({
      ok: true,
      msg: token
    });
  } catch (error) {
    return response.status(500).json({
      ok:false,
      msg: "Error interno del servidor"
    })
  }
}

const profile = async (request, response) => {
  try {
    // const user = await UserModel.getUserByEmail(email)
    return response.json({
      ok: true,
      msg: "Token aceptado"
    })
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      ok: false,
      msg: "Error interno del servidor"
    })
  }
}

export const UserController = {
  register, 
  login,
  profile
}
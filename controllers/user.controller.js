import { UserModel } from "../models/user.model.js";

// ? Funcion para el registro de un nuevo usuario
const register = async (request, response) => {
  try {
    console.log(request.body);
    const {username, email, password} = request.body; // * Destructuracion del request de la peticion HTTP


    return response.status(201).json({
      ok: true,
      msw: "Usuario creado"
    })
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      ok: false,
      msg: "Error internal server"
    });
  }
}

const login = async (request, response) => {
  try {
    
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      ok:false,
      msg: "Error internal server"
    })
  }
}

export const UserController = {
  register, 
  login
}
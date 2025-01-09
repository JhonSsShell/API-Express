import jwt from 'jsonwebtoken';


export const verifyToken = (request, response, next) => {
  let token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({
      ok: false,
      msg: "No contiene el token de autorizacion"
    })
  }

  token = token.split(" ")[1];
  
  try {
    
    const {email} = jwt.verify(token, process.env.JWT_SECRET);
    console.log(email);

    next();
  } catch (error) {
    console.log(error);
    return response.status(400).json({
      ok: false,
      msg: "Token invalido"
    })
  }

}
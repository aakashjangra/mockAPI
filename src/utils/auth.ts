import { verify } from "crypto";
import { userModel } from "../db/db";
import jwt from 'jsonwebtoken'
import { checkPassword, generateToken, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const email : string = req.body.email;
  const password : string = req.body.password;

  if(!email) {
    res.status(401);
    res.json({error: "email missing!"});
    return;
  }

  if(!password) {
    res.status(401);
    res.json({error: "Password missing!"});
    return;
  }

  let user = await userModel.findOne({email: email});

  if(user){
    res.status(401);
    res.json({error: "User already exists!"});
    return;
  }

  const hashedPassword: string = hashPassword(password);

  if(hashedPassword === "not-hashed"){
    res.status(501);
    res.json({err: "Password hashing failed!"});
    return;
  }

  const userObj = {email, password: hashedPassword};

  user = await userModel.create(userObj);

  const token = generateToken(userObj);

  res.json({token});
}

export const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if(!email) {
    res.status(401);
    res.json({error: "email missing!"});
    return;
  }

  if(!password) {
    res.status(401);
    res.json({error: "Password missing!"});
    return;
  }

  const user = await userModel.findOne({email: email});

  if(!user){
    res.status(401);
    res.json({error: "User doesn't exist!"});
    return;
  }

  if(checkPassword(user.password, password) === false){
    res.status(401);
    res.json({error: "Password mismatch!"});
    return;
  }

  const token = generateToken({email: user.email, password: user.password});

  res.json({token});
}

//middleware - checks if valid token exists in header
export const protect = async (req, res, next) => {
  
  //implement protect

  const auth = req.headers.authorization;

  const [, token] = auth.split(" ");

  if(!token){
    res.status(401).json({err: "Token is missing!"});
    return;
  }

  try{

    const user = jwt.verify(token, 'jwt-secret-here');

    req.user = user; //adding user to req. object
    
    next();
  } catch (err){
    res.status(401).json({err});
  }
  
  return;
}

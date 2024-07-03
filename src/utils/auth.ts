import { userModel } from "../db/db";

export const createNewUser = async (req, res) => {
  const username = req.body.username;
  const pass = req.body.password;

  if(!username) {
    res.status(401);
    res.json({error: "Username missing!"});
    return;
  }

  if(!pass) {
    res.status(401);
    res.json({error: "Password missing!"});
    return;
  }

  let user = await userModel.findOne({username: username});

  if(user){
    res.status(401);
    res.json({error: "User already exists!"});
    return;
  }

  user = await userModel.create({username, password: pass});
  user.save();

  res.json({user});
  return;
}

export const loginUser = async (req, res) => {
  const username = req.body.username;
  const pass = req.body.password;

  if(!username) {
    res.status(401);
    res.json({error: "Username missing!"});
    return;
  }

  if(!pass) {
    res.status(401);
    res.json({error: "Password missing!"});
    return;
  }

  const user = await userModel.findOne({username: username});

   if(!user){
    res.status(401);
    res.json({error: "User doesn't exist!"});
    return;
  }

  res.json({user});
  return;
}

//middleware - checks if valid token exists
export const protect = async (req, res, next) => {
  
  //implement protect

  next();
}
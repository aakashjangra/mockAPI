import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const hashPassword = (password: string): string => {

  const saltRounds = 2;
  const hashed = bcrypt.hashSync(password, saltRounds);

  return hashed;
}

const checkPassword = (hashedPassword: string, password: string): boolean => {
  const comparison = bcrypt.compareSync(password, hashedPassword);

  return comparison;
}

const generateToken = (user: {email: string, password: string}) => {
  const token = jwt.sign(user, 'jwt-secret-here');

  return token;
}

export { hashPassword, checkPassword, generateToken };
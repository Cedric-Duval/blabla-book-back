import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkExistingPassword } from '../errors/checkErros';

export async function checkPassword(inputData: string, password: string) {
  const validatedPassword = await bcrypt.compare(inputData, password);
  checkExistingPassword(validatedPassword);
}

export function createToken(currentId: number, currentEmail: string) {
  const token = jwt.sign(
    { id: currentId, email: currentEmail },
    process.env.JWT_SECRET,
    { expiresIn: '4h' },
  );
  return token;
}

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

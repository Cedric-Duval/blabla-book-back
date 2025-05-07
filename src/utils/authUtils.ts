import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function checkPassword(inputData: string, password: string) {
  const validatedPassword = await bcrypt.compare(inputData, password);
  return validatedPassword;
}

export function createToken(currentId: number, currentEmail: string) {
  const token = jwt.sign(
    { id: currentId, email: currentEmail },
    process.env.JWT_SECRET,
    { expiresIn: '4h' },
  );
  return token;
}

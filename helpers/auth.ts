import { compare, hash } from "bcrypt";

export async function hashPassword(password: string, salt: number) {
  return await hash(password, salt);
}

export async function verifyPassword(
  password: string,
  passwordEncrypted: string
) {
  const isValid = await compare(password, passwordEncrypted);
  return isValid;
}

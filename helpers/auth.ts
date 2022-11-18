import { compare, hash } from "bcrypt";

export async function hashData(data: string, salt: number) {
  if (!data) {
    return "";
  }
  return await hash(data, salt);
}

export async function verifyData(data: string, dataEncrypted: string) {
  const isValid = await compare(data, dataEncrypted);
  return isValid;
}

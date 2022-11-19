import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers/connection";
import { toDataTransformedIds } from "../../../helpers/transform";
import { User } from "../../../types/Base";
import { ErrorResponse } from "../../../types/Response";

export const getUsers = async () => {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("Can not connect to database");
  }

  const database = client.db();
  const userTable = database.collection("users");
  const users = (await userTable.find().toArray());
  const usersTransformed = toDataTransformedIds(users as any) as User[];
  client.close();
  return usersTransformed;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | ErrorResponse>
) {}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers/connection";
import { ErrorResponse } from "../../../types/Response";
import { User } from "../../../types/Base";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorResponse>
) {
  if(req.method !== 'GET'){
    return res.status(400).json({
      message: "Only support GET method",
    });
  }
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      message: "id can not empty",
    });
  }

  const client = await connectToDatabase();
  if (!client) {
    return res.status(500).json({
      message: "can not connect to database",
    });
  }

  const database = client.db();
  const userTable = database.collection("users");
  const currentUser = (await userTable.findOne({ _id: id })) as unknown as User;

  if (!currentUser) {
    client.close();
    return res.status(400).json({
      message: "User not found",
    });
  }

  return res.status(200).json(currentUser);
}

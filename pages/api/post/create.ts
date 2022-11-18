import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers/connection";
import { ErrorResponse } from "../../../types/Response";
import { User } from "../../../types/Base";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorResponse>
) {
  if(req.method !== 'POST'){
    return res.status(400).json({
      message: "Only support POST method",
    });
  }

  const { content } = req.body;
  if (!content) {
    return res.status(400).json({
      message: "id can not empty",
    });
  }

  const session = await getSession({req});
  if(!session){
    return res.status(401).json({
        message: 'Unauthorized!',
    })
  }

  const client = await connectToDatabase();
  if (!client) {
    return res.status(500).json({
      message: "can not connect to database",
    });
  }

  const database = client.db();
  const postTable = database.collection("posts");
  const {id} = session.user as User;
  const response = (await postTable.insertOne({ content, userId: id }));

  if (!response.insertedId) {
    client.close();
    return res.status(500).json({
      message: "Error has occurs when insert a post",
    });
  }
  client.close();

  return res.status(201).json({id: response.insertedId.toString()});
}

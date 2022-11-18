import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers/connection";
import { ErrorResponse } from "../../../types/Response";
import { Post } from "../../../types/Base";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | ErrorResponse>
) {
    if(req.method !== 'GET'){
        return res.status(400).json({
          message: "Only support GET method",
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
  
  const posts = await postTable.find({}).toArray() as unknown as Post[];
  if(!posts){
    client.close();
    return res.status(500).json({
        message: 'No Database found'
    })
  }

  client.close();
  return res.status(200).json(posts);
}

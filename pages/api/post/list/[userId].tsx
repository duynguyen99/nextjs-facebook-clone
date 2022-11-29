import { NextApiRequest, NextApiResponse } from "next";
import { getUserPostsById } from ".";
import { Post } from "../../../../types/Base";
import { ErrorResponse } from "../../../../types/Response";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Post[] | ErrorResponse>
  ) {
    if(req.method !== 'GET'){
      return res.status(400).json({
        message: "Only support GET method",
      });
    }
    const userId = req.query.userId as string;
    if (!userId) {
      return res.status(400).json({
        message: "id can not empty",
      });
    }
    
    const userPosts = await getUserPostsById(userId);
    return res.status(201).json(userPosts);
  }
  

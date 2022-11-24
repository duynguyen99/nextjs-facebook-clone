import { NextApiRequest, NextApiResponse } from "next";
import { User } from "next-auth";
import { ErrorResponse } from "../../../types/Response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorResponse>
) {
  const { slug, userId } = req.query;
  console.log('slug: ', slug);
  console.log('userId: ', userId);
}

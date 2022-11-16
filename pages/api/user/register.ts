
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "next-auth";
import { hashPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/connection";
import { ErrorResponse } from "../../../types/Response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorResponse>
){
  const data = req.body;
  const {email, password} = data;

  if (!email || !password) {
    return res.status(400).json({
      message: "email or password can not empty",
    });
  }

  if (email && !email.includes("@")) {
    return res.status(400).json({
      message: "email is invalid",
    });
  }

  if (password && password.trim() < 7) {
    return res.status(400).json({
      message: "password must great than 7 character",
    });
  }

  console.log("email, password");
  const client = await connectToDatabase();
  if (!client) {
    return res.status(400).json({
      message: "can not connect to database",
    })
  }


  const database = client.db();
  const userTable = database.collection("users");

  const existedEmail = await userTable.findOne({email});
  if(existedEmail){
    client.close();
    return res.status(409).json({message: "email is existed"});
  }

  const passwordEncrypted = await hashPassword(password, 12);
  await userTable.insertOne({ email, password: passwordEncrypted});

  client.close();
  return res.status(201).json({ message: "register successfully!" });
};

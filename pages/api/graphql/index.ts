import { ApolloServer } from "apollo-server-express";
import { NextApiRequest, NextApiResponse } from "next";
import typeDefs from "../../../graphql/schema";
import mongoose from "mongoose";
import express from "express";
import * as resolvers from "../../../graphql/resolvers";
import { mongooseConnection } from "../../../helpers/connection";

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:({ req })=>{ 
    return {req}
}
});

export default async function graphqlHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log('mongoose.connection', mongoose.connection)
  const PORT = process.env.PORT || 5000;
  if(mongoose.connection.readyState){
    return;
  }
  const client = await mongooseConnection();
  if (!client) {
    throw new Error("Can not connect to database");
  }
  await server.start()
  server.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log("app is running on port ", PORT);
  });
}
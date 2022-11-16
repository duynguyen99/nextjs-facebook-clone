import NextAuth, { SessionOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/connection";
import { User } from "../../../types/User";
export const authOptions = {
  session: {
    jwt: true,
  } as Partial<SessionOptions>,
  providers: [
    Credentials({
      async authorize(credentials: Record<string, string> | undefined) {
        const client = await connectToDatabase();
        console.log("vao day", credentials?.password);
        const database = client.db();
        const userTable = database.collection("users");
        const user = await userTable.findOne({ email: credentials?.email });
        console.log("user", user);
        if (!user) {
          throw new Error("No user found");
        }
        const isValidPassword = await verifyPassword(
          credentials?.password || "",
          user.password
        );
        console.log("isValidPassword", isValidPassword);
        if (!isValidPassword) {
          throw new Error("Password is incorrect");
        }
        client.close();
        console.log("credentials?.email", credentials?.email);
        return { email: credentials?.email } as User;
      },
      credentials: {},
    }),
  ],
};

export default NextAuth(authOptions);

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyData } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/connection";
export default NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ token }) {
      // expires: one day
      delete token.password;
      return { user: token, expires: "86400000" };
    },
  },
  providers: [
    Credentials({
      async authorize(credentials: Record<string, string> | undefined) {
        const client = await connectToDatabase();
        const database = client.db();
        const userTable = database.collection("users");
        const user = await userTable.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("No user found");
        }
        const isValidPassword = await verifyData(
          credentials?.password || "",
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Password is incorrect");
        }
        client.close();
        return { ...user, id: user._id as unknown as string };
      },
      credentials: {},
    }),
  ],
});

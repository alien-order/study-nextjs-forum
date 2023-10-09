import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'd2c9a3a6c07da726767e',
      clientSecret: 'ab909ab8d719d826d4f4c3f2d85e5dc4cec3f712',
    }),
  ],
  secret : 'qwer1234',
  adapter : MongoDBAdapter(connectDB)
}

export default NextAuth(authOptions);
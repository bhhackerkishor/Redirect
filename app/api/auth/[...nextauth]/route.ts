import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";
import User from "@/models/User";

// authOptions should be internal
const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connect();

        const user = await User.findOne({
          $or: [
            { email: credentials.identifier },
            { username: credentials.identifier },
          ],
        });

        if (!user) throw new Error("No user found");
        if (!user.password) throw new Error("Use OAuth provider to login");

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) throw new Error("Invalid password");

        return { id: user._id.toString(), email: user.email, name: user.username };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};

// App Router requires exporting a default handler using NextAuth()
const handler = NextAuth(authOptions);

// Wrap in GET and POST to satisfy Next.js route type
export { handler as GET, handler as POST };

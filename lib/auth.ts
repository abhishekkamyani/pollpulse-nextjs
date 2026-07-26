import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

const config = {
    session: { strategy: "jwt" as const },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    await connectDB();

                    const user = await User.findOne({ email: credentials?.email });

                    if (!user) return null;

                    const isValid = await bcrypt.compare(
                        credentials?.password as string,
                        user.password
                    );

                    if (!isValid) return null;

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                    };
                } catch (err) {
                    console.error("AUTH ERROR:", err);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token?.id) session.user.id = token.id;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.AUTH_SECRET,
};

const { handlers, auth, signIn, signOut } = NextAuth(config);

export { handlers, auth, signIn, signOut };
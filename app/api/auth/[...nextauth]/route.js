import connectDB from "@/lib/connectDB";
import UserModel from "@/model/UserModel";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
const bcrypt = require("bcrypt");

// const { NextResponse } = require("next/server");

const authOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, //30din
    },
    providers: [
        Credentials({
            credentials: {
                // fields we send at the time of login
                email: {},
                password: {},
            },

            async authorize(credentials) {
                const { email, password } = credentials;

                await connectDB();

                if (!email || !password) {
                    return null;
                } else {
                    const isUserExists = await UserModel.findOne({ email });

                    if (!isUserExists) {
                        return null;
                    } else {
                        const isPasswordMatched = await bcrypt.compare(
                            password,
                            isUserExists.password
                        );
                        if (!isPasswordMatched) {
                            // return null;
                            throw new Error("Email or Password not matched");
                        } else {
                            return isUserExists;
                        }
                    }
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.role = user.role;
                token.userName = user.username;
                token._id = user._id;
            }
            return token;
        },
        async session({ session, user, token }) {
            session.user.name = token.userName;
            session.user.role = token.role;
            session.user._id = token._id;

            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
    },
    pages: {
        signIn: "/auth",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

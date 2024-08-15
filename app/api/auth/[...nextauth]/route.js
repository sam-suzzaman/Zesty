import connectDB from "@/lib/connectDB";
import { USER_ROLES } from "@/lib/Constants";
import ResturantModel from "@/model/ResturantModel";
import UserModel from "@/model/UserModel";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
const bcrypt = require("bcrypt");

// const { NextResponse } = require("next/server");

export const authOptions = {
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
                type: {},
            },

            async authorize(credentials) {
                const { email, password, type } = credentials;

                let isUserExists = null;

                try {
                    await connectDB();
                    if (!email || !password || !type) {
                        throw new Error(
                            "All fields are required (email,password,type)"
                        );
                    } else {
                        if (type === USER_ROLES.USER) {
                            isUserExists = await UserModel.findOne({ email });
                        } else if (type === USER_ROLES.RESTURANT) {
                            isUserExists = await ResturantModel.findOne({
                                email,
                            });
                        }

                        if (!isUserExists) {
                            throw new Error("User not found");
                        } else {
                            const isPasswordMatched = await bcrypt.compare(
                                password,
                                isUserExists.password
                            );
                            if (!isPasswordMatched) {
                                throw new Error(
                                    "Email or Password not matched"
                                );
                            } else {
                                return isUserExists;
                            }
                        }
                    }
                } catch (error) {
                    throw new Error(error?.message);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                // console.log(user);
                token._id = user._id;
                token.email - user.email;
                token.role = user.role;
                token.avatar = user.avatar;
                token.createdAt = user.createdAt;
                token.updatedAt = user.updatedAt;

                if (user.role === USER_ROLES.USER) {
                    token.userName = user.username;
                }
                if (user.role === USER_ROLES.RESTURANT) {
                    token.name = user.name;
                }
            }
            return token;
        },
        async session({ session, user, token }) {
            session.user._id = token._id;

            session.user.email = token.email;
            session.user.role = token.role;
            session.user.avatar = token.avatar;
            session.user.createdAt = token.createdAt;
            session.user.updatedAt = token.updatedAt;

            if (token.role === "USER") {
                session.user.username = token.userName;
            }
            if (token.role === "RESTURANT") {
                session.user.name = token.name;
            }

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

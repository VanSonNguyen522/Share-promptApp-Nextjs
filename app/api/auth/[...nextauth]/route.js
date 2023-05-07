import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {

        },
        async signIn({ account, profile, user, credentials }) {
            try {
                await connectToDB();
                
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        },
    }
});

export {
    handler as GET,
    handler as POST,
};

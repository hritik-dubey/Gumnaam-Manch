import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import UserModel, {IUser} from "@/models/user.model";
import dbConnect from "@/lib/dbconnect";


const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Emial",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            async authorize(credential: any,): Promise<any> {
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            {email: credential.identifier},
                            {username: credential.identifier},
                        ]
                    })
                    if (!user) {
                        throw new Error(`User not found`)
                    }
                    if (!user.isVerified) {
                        throw new Error(`please verify`)
                    }
                    const isMatch = await bcrypt.compare(credential.password, user.password)
                    if (isMatch) {
                        return user
                    } else {
                        throw new Error(`Invalid password`)
                    }
                } catch (err) {
                    throw new Error(err)
                }
            }
        })
    ],
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXT_AUTH_KEY,
    callbacks: {
        async session({session, token}) {
            if(token){
                // session.user._id = token._id
                // session.user.username = token.username
                // session.user.isVerified = token.isVerified
                // session.user.isAcceptingMessage = token.isAcceptingMessage
            }
            return session
        },
        async jwt({token, user}) {
            if (user) {
                // token._id = user._id?;
                // token.username = user.username;
                // token.isVerified = user.isVerified;
                // token.isAcceptingMessage = user.isAcceptingMessage;
            }
            return token
        }
    }
}

export default authOptions;
import dbConnect from "@/lib/dbconnect";
import UserModel, {IUser} from "@/models/user.model";
import {sendVerificationEmail} from "@/helper/sendVerificationEmail";
import bcrypt from "bcryptjs"

export async function POST(request: Request, response: Response) {
    await dbConnect()
    try {
        let {username, email, password} = await request.json()
        const existingUserByVerifiedName = await UserModel.findOne({
            username,
            isVerified: true
        })
        if (existingUserByVerifiedName) {
            return Response.json(
                {
                    success: false,
                    message: "userName already exists"
                }, {
                    status: 400
                }
            )
        }
        const existingUserByEmail:IUser = await UserModel.findOne({
            email,
            isVerified: true
        })
        const verifyCode: string = Math.floor(100000 + Math.random() * 900000).toString()
        if (existingUserByEmail) {
            if(existingUserByEmail.isVerified){
                return Response.json(
                    {
                        success: false,
                        message: "user already exists with this email address"
                    }, {
                        status: 400
                    }
                )
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000)
                await existingUserByEmail.save()
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate:Date = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
            const user = new UserModel({
                username,
                email,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isAcceptingMessage: true,
                isVerified: false,
                messages: [],
                password: hashedPassword
            })
            await user.save()
        }
        // send verification email
        const emailResponse = await sendVerificationEmail(email,username,verifyCode)
        if(!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message
                }, {
                    status: 500
                }
            )
        }
        return Response.json(
            {
                success: true,
                message: "User created successfully,pls verified your email"
            }, {
                status: 201
            }
        )


    } catch (err) {
        console.log(err)
        return Response.json(
            {
                success: false,
                message: "Error in restring user"
            }, {
                status: 500
            }
        )
    }
}
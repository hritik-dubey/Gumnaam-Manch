import {Resend} from 'resend';
import verificationEmail from "../../emails/templates";
import {ApiResponse} from "@/types/apiResponse";
import {resend} from "@/lib/resend";


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'verification Code of sach bol',
            react:verificationEmail({username:username, OTP:verifyCode}),
        });
        return {
            success: true,
            message: "Succesfull verification email"
        }
    }catch (error){
        console.log("Error")
        return {
            success: false,
            message: "Error in verification email"
        }
    }
}

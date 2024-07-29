import {resend} from "@/lib/resend"
import VerificationEmail from "../../emails/varificationEmail"
import { ApiResponse } from "@/constomTypes/ApiResponse"

export async function sendVarificationEmail(email: string, username: string, verifyCode: string): Promise<ApiResponse>{ 
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'opensuggestion | Verification Code',
            react: VerificationEmail({username, otp:verifyCode}),
        });
        return {success: false, message: "Failed To Send Email."}
    } catch (error) {
        console.error("Error in sending varification email : ",error);
        return {success: false, message: "Failed To Send Email."}
    }

}  
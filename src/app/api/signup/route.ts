import dbConnect from "@/lib/dbConnection";
import userModel from "@/model/User";
import bcrypt from 'bcryptjs';
import {sendVarificationEmail} from "@/helper/sendVarificationEmail"

export async function POST(request: Request) {
    await dbConnect();
    try {
        const {username, email, password} = await request.json();
        const existingUserverifiedByUsername = await userModel.findOne({
            username,
            isVerified: true
        })
        const existingUserByEmail = await userModel.findOne({email});
        const verifyCode = Math.floor(Math.random()*10000).toString();
        if(existingUserverifiedByUsername){
            return Response.json({
                success: false,
                message: "username is already taken"
            },{status:400})
        }
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    succss: false,
                    message: "this email is already varified."
                },{status: 400})
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpair = new Date(Date.now()+3600000);
                
                await existingUserByEmail.save(); 
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours()+0.25);
            const newUser = new userModel({
                name: username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpair: expiryDate,
                isVerified: false,
                isAccepting: true,
                message: []
            })
            await newUser.save();
        }
        const emailResponse = await sendVarificationEmail(email, username, verifyCode);
        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            },{status: 500});
        }
        return Response.json({
            success: true,
            message: "User Registred | Verify Your Email"
        },{status: 201});
    } catch (error) {
        console.error("erro Registering User",error);  
        return Response.json({
            success: false,
            message: "Error in Registering User"
        }, {
            status: 500
        }) 
    }
}
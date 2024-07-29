import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document {
    content: String,
    createdAt: Date
}
const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    name: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpair: Date,
    isVerified: boolean,
    isAccepting: boolean,
    message: Message[]
}
const userSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: [true,"Name is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        match: [/.+\@.+\..+/,'please use a valid email address']
    },
    password: {
        type: String,
        required: [true,"Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true,"verifyCode is required"],
    },
    verifyCodeExpair: {
        type: Date,
        required: [true,"verifyCodeExpary is required"],
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAccepting: {
        type: Boolean,
        default:true,
    },
    message: [messageSchema]
})

const userModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",userSchema));

export default userModel;
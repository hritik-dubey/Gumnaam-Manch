import mongoose, {Schema,Document} from 'mongoose';

export interface Message extends Document{
    content: string;
    created:Date;
}

const MessageSchema:Schema<Message> = new  Schema({
    content:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        required:true,
        default:Date.now
    }
})

export interface User extends Document{
    username:string
    email:string
    password:string
    verifyCode:string
    verifyCodeExpiry:Date
    isVaifed:boolean
    isAcceptingMessage : boolean
    messages:Message[]
}

const UserSchema:Schema<User> = new  Schema({
    username:{
        type:String,
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        match:[/.+\@.+\..+/,"Enter a valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"Code is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"code is expired"]
    },
    isVaifed:{
        type:Boolean,
        required:true,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        required:true,
        default:true
    },
    messages:{
        type:[MessageSchema],
        required:true
    }
})

const UserMOdel = (mongoose.models.user as mongoose.Model<User>)
    || mongoose.model<User>('User',UserSchema);

export default UserMOdel;
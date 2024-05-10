import { Schema,Document, HydratedDocument } from "mongoose";

export interface UserProfileAttributes extends Document {
    _id?:Schema.Types.ObjectId;
    username:string;
    first_name:string;
    last_name:string;
    phone_number:string;
    email:string;
    address:string;
    password:string;
    createdAt?:Date;
    updatedAt?:Date
}
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname :{type:String,reuried:true},
    lastname:{type:String,required:true},
    bio: { type: String },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const User=mongoose.model('User',userSchema);

import mongoose from 'mongoose';
const schema=new mongoose.Schema({turbineId:Number,timestamp:{type:Date,default:Date.now},severity:String,message:String,reason:String,recommendation:String,resolved:{type:Boolean,default:false}}); schema.index({turbineId:1,timestamp:-1});
export default mongoose.model('Alert',schema);

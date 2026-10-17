import mongoose from 'mongoose';
const schema=new mongoose.Schema({turbineId:Number,turbineName:String,timestamp:{type:Date,default:Date.now},windSpeed:Number,temperature:Number,vibration:Number,rpm:Number,powerOutput:Number,gearboxTemperature:Number,healthScore:Number,riskLevel:String,status:String});
schema.index({turbineId:1,timestamp:-1}); schema.index({timestamp:-1});
export default mongoose.model('TurbineHistory',schema);

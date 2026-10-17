import mongoose from 'mongoose';
const schema=new mongoose.Schema({id:{type:Number,unique:true},name:String,location:String,windSpeed:Number,temperature:Number,vibration:Number,rpm:Number,powerOutput:Number,gearboxTemperature:Number,currentHealth:Number,currentRisk:String,status:String,updatedAt:Date});
export default mongoose.model('Turbine',schema);

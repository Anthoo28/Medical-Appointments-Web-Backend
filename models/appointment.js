const {Schema, model} = require('mongoose');


const appointmentSchema = new Schema({

    reason:{
        type:String,
        required:[true,'Reason is required'],
    },

    date:{
        type:Date,
        required:[true,'Date is required'],
    },

    time:{
        type:String,
        required:[true,'Time is required']
    },
    status:{
        type:Boolean,
        default:true,
        required:true
    },

    user:{
        type: String, 
        ref:'User',
        required:true
    },

    patient:{
        type: String, 
        ref:'Patient'
    },

    doctor:{
        type: String, 
        ref:'Doctor',
        required:true
    }

    

});


appointmentSchema.methods.toJSON= function(){
    const {__v, status, ...appointment}=this.toObject();
    return appointment;
}

module.exports = model('Appointment',appointmentSchema);

const {Schema, model} = require('mongoose');


const appointmentSchema = new Schema({

    reason:{
        type:String,
        required:[true,'Reason is required'],
    },

    Date:{
        type:Date,
        required:[true,'Date is required'],
    },

    time:{
        type:String,
        required:[true,'Time is required']
    },
    status:{
        type:Boolean,
        default:false,
        required:true
    },

    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    patient:{
        type:Schema.Types.ObjectId,
        ref:'Patient',
        required:true
    },

    doctor:{
        type:Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    },

    specialty:{
        type:Schema.Types.ObjectId,
        ref:'Specialty',
        required:true
    },

    schedule:{
        type:Schema.Types.ObjectId,
        ref:'Schedule',
        required:true
    },
   
    

});


appointmentSchema.methods.toJSON= function(){
    const {__v, status, ...appointment}=this.toObject();
    return appointment;
}

module.exports = model('Appointment',appointmentSchema);

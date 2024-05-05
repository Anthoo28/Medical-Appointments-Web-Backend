const {Schema, model}= require('mongoose');


const medicalHistorySchema = new Schema({

    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    doctor:{
        type:Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    },

});

medicalHistorySchema.methods.toJSON = function(){
    const{__v, ...medicalHistory}=this.toObject();
    return medicalHistory;

}


module.exports = model('MedicalHistory',medicalHistorySchema);
const {Schema, model} = require('mongoose');


const medicalExamSchema = new Schema({

    date:{

        type:Date,
        required:true,
        default:Date.now
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    doctor:{
        type:Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    },
    examType:{
        type:String,
        required:true
    },
    result:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }


});

medicalExamSchema.methods.toJSON = function(){
    const {__v,status, ...medicalExam} = this.toObject();
    return medicalExam;
}

module.exports = model('MedicalExam',medicalExamSchema);
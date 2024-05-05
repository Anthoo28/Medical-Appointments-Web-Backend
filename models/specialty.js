const {Schema, model} = require('mongoose'); 


const specialtySchema = new Schema({

    name:{
        type:String,
        required:[true,'Name is required'],
    },

    description:{
        type:String,
        required:[true,'Description is required']
    },
    status:{
        type:Boolean,
        default:true,
        required:true
    },
    doctor:{
        type:Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    }
    ,
    img:{
        type:String
    }

});

specialtySchema.methods.toJSON = function(){
    const{__v,status, ...specialty}=this.toObject();
    return specialty;
}


module.exports = model('Specialty',specialtySchema);
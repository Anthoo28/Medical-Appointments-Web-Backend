const {Schema,model } = require('mongoose');


const doctorSchema = new Schema({

    dni:{
        type:String,
        required:[true,'DNI is required'],
        unique:true
    },
    CMP:{
        type: String,
        required:[true,'CPM is required'],
        unique:true
    },
    name:{
        type:String,
        required:[true,'Name is required']
    },
    lastname:{
        type:String,
        required:[true,'Lastname is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true
    },
    role:{
        type:String,
        required:true,
        default:'DOCTOR_ROLE',
        enum:['ADMIN_ROLE','USER_ROLE','DOCTOR_ROLE']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    bornDate:{
        type:Date,
        required:[true,'Born date is required']
    },
    img:{
        type:String
    },
    phone:{
        type:String,
        required:[true,'Phone is required']
    },
    
    specialty:[{
        type:Schema.Types.ObjectId,
        ref:'Specialty',
        required:[true,'Specialty is required']
    }],

    address:{
        type:String,
        required:[true,'Address is required']
    },


});

doctorSchema.methods.toJSON = function(){
    const{__v,password,dni,...doctor}= this.toObject();
    doctor.uid=dni;
    return doctor;
}

modeule.exports = model('Doctor',doctorSchema);

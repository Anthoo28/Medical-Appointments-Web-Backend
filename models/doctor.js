const {Schema,model } = require('mongoose');


const doctorSchema = new Schema({

    dni:{
        type:String,
        required:[true,'DNI is required'],
        unique:true
    },
    CPM:{
        type:String,
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

    username:{
        type:String,
        required:[true,'Username is required'],
        unique:true
    },




})
const {Schema, model}= require('mongoose');


const scheduleSchema = new Schema({

doctor:{
    type:Schema.Types.ObjectId,
    ref:'Doctor',
    required:true
},
date:{
    type:Date,
    required:true
},
start_time:{
    type:String,
    required:true
},

end_time:{
    type:String,
    required:true
},
});

scheduleSchema.methods.toJSON = function(){
    const{__v, ...schedule}=this.toObject();
    return schedule;
}


module.exports=model('Schedule',scheduleSchema);

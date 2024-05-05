const {Schema, model}= require('mongoose');


const commentSchema = new Schema({

    comment:{
        type:String,
        required:[true,'Comment is required'],
    },

    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    ranking:{
        type:Number,
        required:true
    },

    date:{
        type:Date,
        required:true,
        default:Date.now
    },


});

commentSchema.methods.toJSON = function(){
    const{__v, ...comment}=this.toObject();
    return comment;

}


module.exports = model('Comment',commentSchema);
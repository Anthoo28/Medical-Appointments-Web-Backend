const {Schema, model}= requiere('mongoose');


const allergySchema = new Schema({

    medicalHistory:{
        type: Schema.Types.ObjectId,
        ref: 'MedicalHistory',
        required: true
    },

    allergy:{
        type:String,
        required: true
    },
    detail:{
        type:String,
    },

    diagnosticDate:{
        type: Date,
        required: true
    },
    allergyType:{
        type: String,
        required: true,
    },

    severity:{
        type: String,
        required: true,
        enum: ['Mild', 'Moderate', 'Severe']
    }


});

allergySchema.methods.toJSON = function(){
    const{__v, ...allergy}=this.toObject();
    return allergy;

}


module.exports= model('Allergy', allergySchema);
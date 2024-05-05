const {Schema, model} = require('mongoose');

const familyHistorySchema = new Schema({

    medicalHistory:{
        type: Schema.Types.ObjectId(),
        ref: 'MedicalHistory',
        required: true
    },
    familyHistory:[
        {
            relation:{
                type:String,
                required:true,

            },
            condition:{
                type: String,
                required: true
            }
            ,
            detail:{
                type:String,
                required:true
            }
        }
    ]

});

medicalHistorySchema.methods.toJSON = function () {
    const { __v, ...familyHistory } = this.toObject();
    return familyHistory;
};


module.export= model('FamilyHistory', familyHistorySchema);
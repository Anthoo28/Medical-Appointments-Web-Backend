const {Schema, model} = require('mongoose');

const historySchema = new Schema({

    medicalHistory:{
        type: Schema.Types.ObjectId(),
        ref: 'MedicalHistory',
        required: true
    },

    prenatal_history:{
        type: String,
        required: false
    },
    natal_history:[{ 
        type: String,
        required: false
    }],
    postnatal_history:[{
        type: String,
        required: false
    }],
    personal_history:[{
        type: String,
        required: false
    }],
    pathological_personal_history:[{
        type: String,
        required: false
    }],
    family_history:[{
        type: String,
        required: false
    }],
    
});

medicalHistorySchema.methods.toJSON = function () {
    const { __v, ...history } = this.toObject();
    return history;
};


module.export= model('history', historySchema);
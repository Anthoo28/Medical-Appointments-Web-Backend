const mongoose = require('mongoose');

const DBConnection= async()=>{

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {

        });
        console.log('Database online 😎');
    } catch (error) {
        console.log(error);
        throw new Error('Error initializing database');
    }


}

module.exports = {
    DBConnection
}
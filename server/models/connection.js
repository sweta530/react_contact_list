const mongoose = require('mongoose')
console.log(process.env.MONGOOSE_URL);
mongoose.connect(process.env.MONGOOSE_URL, {})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
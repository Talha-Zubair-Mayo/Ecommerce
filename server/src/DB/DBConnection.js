const mongoose = require('mongoose');

const URI = process.env.MongoDbURL

mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    
}, err => {
    if (err) throw err;
    console.log(`Connected To MongoDB`)

})
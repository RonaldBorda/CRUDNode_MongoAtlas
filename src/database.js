const mongoose = require('mongoose');
const password = 'VixWxcSLuW2XXODG';
const dbname = 'lab11';
const MONGODB_URI =  `mongodb+srv://root:${password}@cluster0.vyoxs.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
 
})
    .then(db => console.log('MongoDB conectado correctamente'))
    .catch(err => console.log(err));
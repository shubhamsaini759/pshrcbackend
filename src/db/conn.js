const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017',{
    dbName : 'pshrc',
    useNewUrlParser : true
})
.then((res)=>{
    console.log('hacking...')
})
.catch((err)=>{
    console.log(err)
})
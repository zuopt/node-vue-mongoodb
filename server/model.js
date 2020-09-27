const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/element-admin',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
})

//文章
const articleSchema = new mongoose.Schema({
    title:{type:String},
    body:{type:String},
})
const Article = mongoose.model('Article',articleSchema)

//用户
const userSchema = new mongoose.Schema({
    username:{ type:String,unique:true},
    password:{
        type:String,
        set(val){
            return require('bcrypt').hashSync(val,10)
        }
    }
})
const User = mongoose.model('User',userSchema)

module.exports = {
    Article,
    User
}
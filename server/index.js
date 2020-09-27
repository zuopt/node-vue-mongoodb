const express = require('express')
const app = express()

app.use(require('cors')())
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./router')(app)

app.listen(3001, ()=>{
    console.log("服务器启动3001")
})
module.exports = app => {
    const express = require('express')
    const { Article,User,Employee } = require('./model')
    const jwt = require('jsonwebtoken')
    const SECRET = 'mojoiewnof15'

    const router = new express.Router({
        mergeParams:true
    })

    const auth = async (req,res,next) => {
        let raw = String(req.headers.authorization || '').split(' ').pop()
        if(!raw){
            res.status(401).send({
                message:'验证失败'
            })
        }
        let tokenData = jwt.verify(raw, SECRET, (error, decoded) => {
            if (error) {
                res.status(401).send({
                    message:'验证失败'
                })
                return
            }
            return decoded
        })
        if(!tokenData) {
            res.status(401).send({
                message:'验证失败'
            })
        }
        let user = await User.findById(tokenData.id)
        if(!user) {
            res.status(422).send({
                message:'用户不存在'
            })
        }
        req.user = user
        await next()
    }

    router.get('/', async (req,res) => {
        res.send('index')
    })
    
    //新增文章
    router.post('/api/articles', auth ,async (req,res) =>{
        const article = await Article.create((req.body))
        res.send(article)
    })
    // 文章列表
    router.get('/api/articles', auth, async (req,res) => {
        let pageNumber =Number(req.query.pageNumber)
        let pageSize = Number(req.query.pageSize)
        const totalElements = await Article.find().count()
        const articles = await Article.find().skip((pageNumber - 1) * pageSize).limit(pageSize)
        const data = {
            pageNumber,
            pageSize,
            totalPages:Math.ceil(totalElements/pageSize),
            totalElements: String(totalElements),
            content:articles
        }
        res.send(data)
    })
    // 删除文章
    router.delete('/api/articles/:id', auth, async (req,res)=>{
        await Article.findByIdAndDelete(req.params.id)
        res.send({
            status:true
        })
    })
    // 获取文章
    router.get('/api/articles/:id', auth,async (req,res) => {
        let article = await Article.findById(req.params.id)
        res.send(article)
    })
    // 修改文章
    router.put('/api/articles/:id', auth, async (req,res) => {
        let article = await Article.findByIdAndUpdate(req.params.id,req.body)
        res.send(article)
    })

    // 新增管理员
    router.post('/api/register', async (req,res) => {
        let isRegister = await User.findOne({username:req.body.username})
        if(isRegister){
            res.status(422).send({
                message:"用户名已注册"
            })
        }
        let user = await User.create(req.body)
        res.send(user)
    })

    // 删除管理员
    router.delete('/api/user/:id', async (req,res) => {
        let user = await User.findByIdAndDelete(req.params.id)
        res.send(user)
    })
    
    //获取管理员
    router.get('/api/user/:id', async (req,res) => {
      let user = await User.findById(req.params.id)
      res.send(user)
    })

    //更新管理员
    router.put('/api/user/:id', async (req,res) => {
      await User.findByIdAndUpdate(req.params.id,req.body)
      let updatauser = await User.findById(req.params.id)
      res.send(updatauser)
    })

    // 管理员登录
    router.post('/api/login', async (req,res) => {
        let user = await User.findOne({username:req.body.username})
        if(!user){
            res.status(422).send({
                message:'用户不存在'
            })
        }
        let isPasswordValid = require('bcrypt').compareSync(req.body.password,user.password)
        if(!isPasswordValid) res.status(422).send({message:'密码错误'})
        const token = jwt.sign({
            id:user._id
        },SECRET)
        res.send({
            user,
            token
        })
    })

    //用户列表
    router.get('/api/userlist', async (req, res) => {
        let pageNumber = Number(req.query.pageNumber)
        let pageSize = Number(req.query.pageSize)
        const totalElements = await User.find().count()
        const users = await User.find().skip((pageNumber - 1) * pageSize).limit(pageSize)
        const data = {
            pageNumber,
            pageSize,
            totalPages: Math.ceil(totalElements / pageSize),
            totalElements: String(totalElements),
            content: users
        }
        res.send(data)
    })

    //员工列表
    router.get('/api/employees',auth,async (req,res) => {
        let employees = await Employee.find()
        res.send(employees)
    })

    //添加员工
    router.post('/api/employee',auth,async (req,res) => {
        let employee = await Employee.create(req.body)
        res.send(employee)
    })

    //删除员工
    router.delete('/api/employee/:id',auth,async (req,res) => {
        let employee = await Employee.findByIdAndDelete(req.params.id)
        res.send(employee)
    })

    //获取员工
    router.get('/api/employee/:id', auth, async (req, res) => {
        let employee = await Employee.findById(req.params.id)
        res.send(employee)
    })

    //修改员工
    router.put('/api/employee/:id',auth,async (req,res) => {
        let employee = await Employee.findByIdAndUpdate(req.params.id,req.body)
        res.send(employee)
    })

    // 上传图片
    const multer = require('multer')
    const upload = multer({dest:__dirname + '/../server/uploads'})
    app.post('/api/upload',upload.single('file'),async (req,res) => {
        const file = req.file
        file.url = `http://localhost:3001/uploads/${file.filename}`
        res.send(file)
    })

    app.use(router)
    app.use(async (err,req,res,next) => {
        console.log(err)
        res.status(err.status || 500).send({
            message:err.message
        })
    })
}
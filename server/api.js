const models = require('./db');
const express = require('express');
const router = express.Router();

//register
router.post('/login/register',(req,res) => {
    models.login.find({name: req.body.name},(err,data) => {
        if(err){
            res.send({'status': 1002, 'message': '查询失败', 'data': err});
        }else{
            console.log('查询成功'+data)
            if(data.length > 0){
                res.send({'status': 1001, 'message': '该用户名已经注册！'});
            }else{
                let newName = new models.login({
                    name : req.body.name,
                    password : req.body.password
                });
                newName.save((err,data) => {
                    if (err) {
                        res.send({'status': 1002, 'message': '注册失败！', 'data': err});
                    } else {
                        res.send({'status': 1000, 'message': '注册成功!'});
                    }
                });
            }
        }
    })
})
//login
router.post('login/login',(req,res) => {
    models.login.find({name: req.body.name, password: req.body.password},(err,data) => {
        if (err) {
            // res.send(err);
            res.send({'status': 1002, 'message': '查询数据库失败!', 'data': err});
        } else {
            console.log(data)
            if (data.length > 0) {
                res.send({'status': 1000, 'message': '登录成功!', 'data': data});
            } else {
                res.send({'status': 1001, 'message': '登录失败，该用户没有注册!', 'data': err});
            }
        }
    })
})


module.exports = router;
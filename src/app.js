const express =require('express');
const app=express();

app.use('/index',require('./server/index.js'));

app.listen(3000,()=>{
    console.log('启动成功');
});


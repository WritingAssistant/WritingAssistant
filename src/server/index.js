var express =require('express');
var router=express.Router();
var mysql=require('mysql');

var connection =mysql.createConnection({
    host :'localhost',
    user:'Root',
    password:'123456',
    database:'graduate'
});

router.get ('../pages/login',function(req,res,next){
    connection.connect();
    connection.query('SELECT * FROM graduate',function(error,results,field){
        if(error)throw error;
        console.log(results);
        res.setHeader("Access-Control-Allow-Origin","*");
        res.send(results);
    }
    );
    connection.end();
});

module.exports=router;
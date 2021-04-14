const models = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sql');
const axios = require('axios');
const { connection } = require('mongoose');

const conn = mysql.createConnection(models.mysql);
conn.connect();

// 登录接口
router.post('/login', (req, res) => {
	const user = req.body;
	const sel_email = $sql.user.select + " where email = '" + user.email + "'";
	console.log(sel_email);
	conn.query(sel_email, user.email, (error, results) => {
		if (error) {
			throw error;
		}
		console.log(results)
		if (results[0] === undefined) {
			res.send("-1");  // -1 表示查询不到，用户不存在，即邮箱填写错误
		} else {
			if (results[0].email == user.email && results[0].password == user.password) {
				res.send(user.email);  // 0 表示用户存在并且邮箱密码正确
			} else {
				res.send("1");  // 1 表示用户存在，但密码不正确
			}
		}
	})
});

// 注册接口
router.post('/add', (req, res) => {
	const params = req.body;
	const sel_sql = $sql.user.select + " where username = '" + params.username + "'";
	const add_sql = $sql.user.add;
	console.log(sel_sql);

	conn.query(sel_sql, params.username, (error, results) => {
		if (error) {
			console.log(err);
		}
		if (results.length != 0 && params.username == results[0].username) {
			res.send("-1");   // -1 表示用户名已经存在
		} else {
			conn.query(add_sql, [params.username, params.email, params.password], (err, rst) => {
				if (err) {
					console.log(err);
				} else {
					console.log(rst);
					res.send("0"); // 0 表示用户创建成功
				}
			});
		}
	});
});

//选取话题最长接口
router.post('/longdepth', (req, res) => {
	const sel_topic = 'select topic.topicname from topic join paras on topic.id=paras.topic_id order by length(selectIndexes) desc limit 3;'
	//到时候要改length(SELECTINDEX)
	conn.query(sel_topic, function (error, results) {
		if (error) {
			console.log(error);
			return;
		};
		console.log('results', results);
		var b = JSON.stringify(results);
		res.send(b);
	});

});

//续写话题最多的作者
router.post('/biggestauthor', (req, res) => {
	const sel_author = 'select author,count(*) a from paras group by author having count(author) order by a desc limit 3'
	conn.query(sel_author, function (error, results) {
		if (error) {
			console.log(error);
			return;
		};
		console.log('results', results);
		var c = JSON.stringify(results);
		res.send(c);
	});

});

router.post('/mytopic', (req, res) => {
	const sel_author = 'select * from userinfo'
	conn.query(sel_author, function (error, results) {
		if (error) {
			console.log(error);
			return;
		};
		console.log('results', results);
		var c = JSON.stringify(results);
		res.send(c);
	});

});

//rank左侧与me连接部分1
router.post("/mepost", (req, res) => {
	const sel_mepost = "select email,count(*) as 'new' from userinfo group by username"
	conn.query(sel_mepost, function (error, results) {
		if (error) {
			console.log(error);
			return;
		};
		console.log('results', results);
		var d = JSON.stringify(results);
		res.send(d);
	});
})

//rank左侧头像
router.post("/meavatar", (req, res) => {
	const sel_meavatar = "select * from login "
	conn.query(sel_meavatar, function (error, results) {
		if (error) {
			console.log(error);
			return;
		};
		console.log('results', results);
		var d = JSON.stringify(results);
		res.send(d);
	});
})

//最新的续写
router.post('/newestwriting', (req, res) => {

	const sel_new = 'select content from paras order by time desc limit 3'

	conn.query(sel_new, function (error, results) {
		if (error) {
			console.log(error);
			return;
		};
		console.log('results', results);
		var d = JSON.stringify(results);
		res.send(d);
	});
});

//段落导入接口
router.post('/getParas', (req, res) => {
	const topic = req.body;
	console.log(topic);
	const sel_para =  $sql.paras.select + " where topic_id ='" + topic.id +"'";
<<<<<<< HEAD
	console.log(sel_para);
=======
>>>>>>> f02af37979e3c484e63a0abe6e1bb25d063f94b4

	conn.query(sel_para, topic.id, (error, results) => {
		if (error) {
			console.log(error);
		}else{
			var a = JSON.stringify(results);
			res.send(a);
		}
	})
});
//段落修改接口
router.post('/changePara', (req, res) => {
	const para = req.body;
	const change_para = $sql.paras.change + para.content + " where topic_id = '" + para.topic_id + "' and selectIndexes ='" + para.selectIndexes + "'";
	// console.log(sel_para);

	conn.query(change_para, para, (error, results) => {
		if (error) {
			console.log(error);
		} else {
			res.send("修改成功");
		}

	})
});
//段落添加接口
router.post('/addPara',(req,res)=>{
	    const para = req.body;
	    const add_para = $sql.paras.add;
	    conn.query(add_para,[para.topic_id, para.selectIndexes, para.content, para.author, para.time],(err,rst) => {
	        if(err){
	            console.log(err);
	        }else{
<<<<<<< HEAD
	            console.log(rst);
	            res.send("添加成功") //0表示添加成功
=======
	            res.send("添加成功")
>>>>>>> f02af37979e3c484e63a0abe6e1bb25d063f94b4
	
	        }
	    })
	})

	router.post('/changename',(req,res)=> {
		const sel_changename='update userinfo set username=? where email=?'
		const params=req.body
	    const sel_sql = $sql.user.select + " where username = '" + params.name + "'"
		console.log(sel_sql)
		console.log(params.name);
	    conn.query(sel_sql, params.name, (error, results) => {
		if (error) {
			console.log(error);
		}
		if (results.length != 0 && params.name == results[0].username) {
			res.send("-1");   // -1 表示用户名已经存在
		} else {
			conn.query(sel_changename,[params.name,params.email],function(error,results){
				if(error){
					console.log(error);
					return;
				}
				res.send("0")
			});
		}
	});

	})
	router.post('/changenamelogin',(req,res)=> {
		const sel_changenamelogin='update login set username=? where email=?'
		const params=req.body
	    const sel_sql = $sql.user.select + " where username = '" + params.name + "'"
		console.log(sel_sql)
		console.log(params.name);
	    conn.query(sel_sql, params.name, (error, results) => {
		if (error) {
			console.log(error);
		}
		if (results.length != 0 && params.name == results[0].username) {
			res.send("-1");   // -1 表示用户名已经存在
		} else {
			conn.query(sel_changenamelogin,[params.name,params.email],function(error,results){
				if(error){
					console.log(error);
					return;
				}
				res.send("success")
			});
		}
	});

	})


//获取username接口
router.post('/getUser', (req, res) => {
	const info = req.body;
	const sel_para = "select username from login where email = '" + info.email + "'";

	conn.query(sel_para, (error, results) => {
		if (error) {
			console.log(error);
		}else{
			var username = JSON.stringify(results);
			res.send(username);
		}
	})
});

<<<<<<< HEAD
=======
//获取topic接口
router.post('/getTopic',(req, res) => {
	const sel_topic = "select * from topic";

	conn.query(sel_topic,(error, results) => {
		if (error) {
			console.log(error);
		}else{
			var topic = JSON.stringify(results);
			res.send(topic);
		}
	})
})

>>>>>>> f02af37979e3c484e63a0abe6e1bb25d063f94b4
module.exports = router;
let express = require('express');
let User = require('../model').User;
let path = require("path");
let multer = require('multer');
let xlsx = require('node-xlsx');
let router = express.Router();
let {checkNotLogin,checkLogin} = require('../middleware');
// 注册
let {exportExcel,header,formatDate} = require('../bin/util')


router.post('/add', function (req, res) {
    let oneUser = req.body;
    User.create(oneUser, function (err) {
        if(err) {
            res.end(JSON.stringify({result:false,msg:'手机号重复'}))
        }else {
            res.end(JSON.stringify({result:false,msg:'注册成功'}))
        }
    })
});

// 登入
router.post('/login',checkNotLogin, function (req, res) {
    let user = req.body;
    User.count(user,(err,count) => {
        console.log(count)
    })
    User.find(user, function (err, data) {
        console.log(data)
       if (err) console.log('search查询查询出错： ' + err);
        console.log(data)
       if(data.length === 0) {
           res.end(JSON.stringify({result:false,describe:'用户名和密码不对'}))
       }else if(data.length === 1) {
           req.session.user = data;
		  
           res.end(JSON.stringify({result:true,describe:'登入成功'}))
       }else{
		   res.end("repeat")
	   }
    })
});

// 退出
router.get('/logout', function (req, res) {
    req.session.user = null;
    res.end(JSON.stringify({result:true,describe:'退出成功'}))
	
	
});

router.get('/session', function (req, res , next) {
    res.end(JSON.stringify({res:false,describe:'退出成功'}))
});


//search user
router.get('/search', function (req, res) {
    let {user} = req.query;
    let reg = new RegExp(user, 'i');
    User.find({userName: reg}, function (err, data) {
        if (err) console.log('search查询查询出错： ' + err);
        data = formatDate(data);
        res.send(JSON.stringify(data))
    })
});

//find  title by type
router.post('/typeUsers', function (req, res) {
    let {page, limit, type} = req.body;
    if(type.length>1) {
        User.count({ grade: {
            $in: type[1]
        }},(err,count) => {
            let query;
                query = User.find({
                    grade: {
                        $in: type[1]
                    }
                });
            query.sort({'date':type[0]})
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(function (err, data) {
                    data = formatDate(data);
                    res.send(JSON.stringify({data,count}))
                })
        })
    }else {
        User.count({},(err,count) => {
            let query;
            query = User.find({});
            query.sort({'date':type[0]})
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(function (err, data) {
                    data = formatDate(data);
                    res.send(JSON.stringify({data,count}))
                })
        })
    }

});

//delete  user
router.post('/deleteUsers', function (req, res) {
    let deleteId = req.body.id;
    User.remove({
        _id: {
            $in: deleteId
        }
    }, function (err) {
        if (err) res.send(JSON.stringify({
            result: false
        }));
        else res.send(JSON.stringify({
            result: true
        }))
    })
});

//get one user
router.get('/oneUser', function (req, res) {
    let id = req.query.id;
    User.findById(id, function (err, data) {
        res.send(data)
    })
});

router.get('/info',checkLogin,function (req,res) {
    let user = req.query;
    User.find(user, function (err, data) {
       res.end(JSON.stringify(data))
})});

//update  User
router.put('/updateUser', function (req, res) {
    let id = req.body._id;
    let updateData = req.body;
    User.update({
        _id: id
    }, updateData, function (err, data) {
        if (err) {
            res.end(JSON.stringify({
                result: false,
                msg:'手机号码重复,请重新输入'
            }))
        } else {
            res.end(JSON.stringify({
                result: true,
                msg:'更新成功'
            }))
        }
    })

});

// export
router.get('/exportUserExcel',function (req,res) {
    let arr = [],rows =[];
    User.find({},function (err,data) {
        data = formatDate(data);
        data.forEach(item =>{
            arr = [];
            arr.push(item.userName) ;
            arr.push(item.grade) ;
            arr.push(item.phone) ;
            arr.push(item.subject) ;
            arr.push(item.school) ;
            arr.push(item.limitTime) ;
            arr.push(item.date) ;
            rows.push(arr)
        });
        let result = exportExcel(header,rows);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "user.xlsx");
        res.end(result, 'binary');
    })
});

// import
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = path.resolve(__dirname).replace('routes','')+ 'upload';
        cb(null,uploadPath)
    },
    filename: function (req, file, cb) {
        let fileName = 'user.xlsx';
        cb(null, fileName)
    }
});
let upload = multer({
    storage: storage
}).single('file');
router.post('/importUserExcel',upload,function (req,res) {let uploadPath = path.resolve(__dirname).replace('routes','')+ 'upload/user.xlsx';
    const workSheetsFromFile = xlsx.parse(uploadPath);
    // 表头
    const header = workSheetsFromFile[0].data[0];
    workSheetsFromFile[0].data.shift();
    // 表体
    const rows =workSheetsFromFile[0].data;
    let obj = {};
    let arr =[];

    rows.forEach(item => {
        obj = {};
        item.forEach((one,index) => {
            obj[header[index]]= one
        });
        arr.push(obj)
    });
    console.log(arr);
    User.create(arr, function (err,doc) {
        res.end(JSON.stringify(doc))
    });
});

module.exports = router;
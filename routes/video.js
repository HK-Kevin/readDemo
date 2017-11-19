let express = require('express');
let Video = require('../model').Video;
let path = require("path");
let router = express.Router();

let {formatDate} = require('../bin/util')
// add  video
router.post('/add', function (req, res) {
    let oneVideo = req.body;
    Video.create(oneVideo, function (err) {
        res.end(err)
    })
});

//delete  video
router.post('/deleteVideos', function (req, res) {
    let deleteId = req.body.id;
    Video.remove({
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

//search video
router.get('/search', function (req, res) {
    let {video} = req.query;
    let reg = new RegExp(video, 'i');
    Video.find({
        name: reg
    }, function (err, data) {
        if (err) console.log('search查询查询出错： ' + err);
        data = formatDate(data);
        res.send(JSON.stringify(data))
    })
});

//get one title
router.get('/oneVideo', function (req, res) {
    let id = req.query.id;
    Video.findById(id, function (err, data) {
        res.send(data)
    })
});

//update  video
router.put('/updateVideo', function (req, res) {
    let id = req.body._id;
    let updateData = req.body;
    Video.update({
        _id: id
    }, updateData, function (err, data) {
        if (err) {
            res.end(JSON.stringify({
                result: false
            }))
        } else {
            res.end(JSON.stringify({
                result: true
            }))
        }
    })

});
router.post('/typeVideosInfo',function (req,res) {
    let {page, limit, type} = req.body;
    Video.count({
        type: type[0],
        knowledgePoint: type[1]
    },(err, count) => {
        let query;
        query = Video.find(
            {
                type: type[0],
                knowledgePoint: type[1]
            });
        query.sort({'date':-1})
            .skip((page - 1) * limit)
            .limit(limit)
            .exec(function (err, data) {
                data = formatDate(data);
                res.send(JSON.stringify({data, count}))
            })
    })
})

//find  title by type
router.post('/typeVideos', function (req, res) {
    let {page, limit, type} = req.body;
    if(type.length === 2) {type[2]={$exists: true}}
    if (type.length >= 2) {
        Video.count({
            type: type[1],
            knowledgePoint: type[2]
        },(err, count) => {
            let query;
            query = Video.find(
                {
                    type: type[1],
                    knowledgePoint: type[2]
                });
            query.sort({'date':type[0]})
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(function (err, data) {
                    data = formatDate(data);
                    res.send(JSON.stringify({data, count}))
                })
        })
    } else {
        Video.count({}, (err, count) => {
            let query;
            query = Video.find({});
            query.sort({'date':type[0]}).skip((page - 1) * limit)
                .limit(limit)

                .exec(function (err, data) {
                    data = formatDate(data);
                    res.send(JSON.stringify({data, count}))
                })
        })
    }
});


module.exports = router;
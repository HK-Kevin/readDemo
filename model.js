let mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/read';
let db = mongoose.connect(url,function (e) {

});
let UserSchema = new mongoose.Schema({
    userName: String,
    password:{type:String,default:'123456'},
    phone:{type:String, unique:true},
    grade:String,
    subject:String,
    school:String,
    limitTime:{type:Number,default:50},
    date:{type:Date,default:Date.now},
});
let VideoSchema = new mongoose.Schema({
    name: String,
    type: String,
    url:String,
    click:{type:Number,default:0},
    knowledgePoint: String,
    date:{type:Date,default:Date.now}
});

exports.User = mongoose.model("User", UserSchema);
exports.Video = mongoose.model("Video", VideoSchema);
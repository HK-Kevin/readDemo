let nodeExcel = require('excel-export');
let moment = require('moment');
exports.exportExcel = function (_headers, rows) {
    let conf = {};
    conf.name = "mysheet";
    conf.cols = [];
    for (let i = 0; i < _headers.length; i++) {
        let col = {};
        col.caption = _headers[i].caption;
        col.type = _headers[i].type;
        conf.cols.push(col);
    }
    conf.rows = rows;
    let result = nodeExcel.execute(conf);
    return result;
};
exports.header = [
    {caption: 'userName', type: 'string'},
    {caption: 'grade', type: 'string'},
    {caption: 'phone', type: 'string'},
    {caption: 'school', type: 'string'},
    {caption: 'subject', type: 'string'},
    {caption: 'limitTime', type: 'number'},
    {caption: 'date', type: 'string'},
];
exports.formatDate = function (date) {
    if(date.length === 0 ) {
        return []
    }
    if(date instanceof Array) {
        let tempData = JSON.parse(JSON.stringify(date));
        return tempData.map(item => {
            item.date = moment(item.date).format('YYYY-MM-DD HH:mm:ss');
            return item;
        });
    }
    if(date instanceof Object) {
        let tempData = JSON.parse(JSON.stringify(date));
        tempData.date = moment(tempData.date).format('YYYY-MM-DD HH:mm:ss');
        return tempData
    }
};

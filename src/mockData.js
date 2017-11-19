const subjectData = [{label: '数学'}, {label: '英语'}, {label: '语文'}, {label: '物理'}, {label: '化学'}, {label: '生物'}, {label: '政治'}, {label: '历史'}, {label: '地理 '}];

const subjectDataArr = ['数学', '英语', '语文','物理','化学','生物','政治','地理','历史'];
/*const subjectDataArrDetail = [{
    value: 'english',
    label: '英语',
    children: [
        {
            value: 'word',
            label: '单词'
        },
        {
            value: 'grammar',
            label: '语法'
        },
        {
            value: 'comprehension',
            label: '阅读理解'
        }
    ]
},
    {
        value: 'scienceMath',
        label: '理数',
        children: [
            {
                value: 'function',
                label: '函数'
            },
            {
                value: 'series',
                label: '数列'
            },
            {
                value: 'planimetry',
                label: '平面几何'
            },
            {
                value: 'solidGeometry',
                label: '立体几何'
            },
            {
                value: 'derivative',
                label: '导函数'
            },
            {
                value: 'statistics',
                label: '概率统计'
            },
            {
                value: 'appliedMath',
                label: '应用数学'
            }
        ]
    },
    {
        value: 'liberalMath',
        label: '文数',
        children: [
            {
                value: 'function',
                label: '函数'
            },
            {
                value: 'series',
                label: '数列'
            },
            {
                value: 'planimetry',
                label: '平面几何'
            },
            {
                value: 'solidGeometry',
                label: '立体几何'
            },
            {
                value: 'derivative',
                label: '导函数'
            },
            {
                value: 'statistics',
                label: '概率统计'
            },
            {
                value: 'appliedMath',
                label: '应用数学'
            }
        ]
    }];*/
const subjectDataArrDetail = [{
    value: '英语',
    label: '英语',
    children: [
        {
            value: '单词',
            label: '单词'
        },
        {
            value: '语法知识',
            label: '语法知识'
        },
        {
            value: '阅读理解',
            label: '阅读理解'
        }
    ]
},
    {
        value: '理数',
        label: '理数',
        children: [
            {
                value: '函数方程',
                label: '函数方程'
            },
            {
                value: '数与数列',
                label: '数与数列'
            },
            {
                value: '平面几何',
                label: '平面几何'
            },
            {
                value: '立体几何',
                label: '立体几何'
            },
            {
                value: '导函数',
                label: '导函数'
            },
            {
                value: '概率统计',
                label: '概率统计'
            },
            {
                value: '应用数学',
                label: '应用数学'
            }
        ]
    },
    {
        value: '文数',
        label: '文数',
        children: [
            {
                value: '函数方程',
                label: '函数方程'
            },
            {
                value: '数与数列',
                label: '数与数列'
            },
            {
                value: '平面几何',
                label: '平面几何'
            },
            {
                value: '立体几何',
                label: '立体几何'
            },
            {
                value: '导函数',
                label: '导函数'
            },
            {
                value: '概率统计',
                label: '概率统计'
            },
            {
                value: '应用数学',
                label: '应用数学'
            }
        ]
    }];
const menuData = [
    {
        icon: 'el-icon-setting',
        index: 'add',
        title: '视频管理',
        subs:[{ index: 'updateVideo',
            title: '视频管理'}]
    },
    {
        icon: 'el-icon-menu',
        index: 'user',
        title: '用户管理',
        subs:[{ index: 'updateUser',
            title: '用户管理'}]
    }
];
const userType = ['高三','高二','高一', '初三', '初二','初一'];
const baseUrl = 'http://47.94.94.52:2017';
let rootUrl = 'http://47.94.94.52:2017';
export  {subjectData,subjectDataArr,menuData,userType,rootUrl,subjectDataArrDetail}

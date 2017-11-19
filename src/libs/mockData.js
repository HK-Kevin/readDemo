let mockData = {};
mockData.menuData = [
  {
    type: 'earth', name:'1', url: '/main/eng', label: '英语', children: [
    {name: '/main/word', url: '/main/word', label: '单词'},
    {name: '1-2', url: '/main/grammar', label: '语法知识'},
    {name: '1-3', url: '/main/comprehension', label: '阅读理解'},
  ]
  },
  {
    type: 'podium', name: '2', url: '/main/science_math', label: '理数', children: [
    {name: 2 - 1, url: '/main/sci_math_function', label: '函数方程'},
    {name: 2 - 2, url: '/main/sci_math_series', label: '数与数列'},
    {name: 2 - 3, url: '/main/sci_math_planimetry', label: '平面几何'},
    {name: 2 - 4, url: '/main/sci_math_solidGeometry', label: '立体几何'},
    {name: 2 - 5, url: '/main/sci_math_derivative', label: '导函数'},
    {name: 2 - 6, url: '/main/sci_math_statistics', label: '概率统计'},
    {name: 2 - 7, url: '/main/sci_math_appliedMath', label: '应用数学'},
  ]
  },
  {
    type: 'earth', name: 3, url: '/main/liberal-math', label: '文数', children: [
    {name: 3 - 1, url: '/main/lib_math_function', label: '函数方程'},
    {name: 3 - 2, url: '/main/lib_math_series', label: '数与数列'},
    {name: 3 - 3, url: '/main/lib_math_planimetry', label: '平面几何'},
    {name: 3 - 4, url: '/main/lib_math_solidGeometry', label: '立体几何'},
    {name: 3 - 5, url: '/main/lib_math_derivative', label: '导函数'},
    {name: 3 - 6, url: '/main/lib_math_statistics', label: '概率统计'},
    {name: 3 - 7, url: '/main/lib_math_appliedMath', label: '应用数学'},
  ]
  },
  /* {type: 'ios-paper', name: 3, url: '/main/china', label: '语文'},
   {type: 'thermometer', name: 4, url: '/main/physics', label: '物理'},
   {type: 'ios-flask', name: 5, url: '/main/chemistry', label: '化学'},
   {type: 'ios-body', name: 6, url: '/main/biology', label: '生物'},
   {type: 'star', name: 7, url: '/main/politics', label: '政治'},
   {type: 'ios-film', name: 8, url: '/main/history', label: '历史'},
   {type: 'ios-location', name: 9, url: '/main/geography', label: '地理'},*/
];

mockData.transformData = {
  math: '数学',
  eng: '英语',
  china: '语文',
  physics: '物理',
  biology: '生物',
  chemistry: '化学',
  politics: '政治',
  history: '历史',
  geography: '地理'
};
mockData.translateSeaCon =
{
  word: ['英语', '单词'],
  grammar: ['英语', '语法知识'],
  comprehension: ['英语', '阅读理解'],
  sci_math_function: ['理数', '函数方程'],
  sci_math_series: ['理数', '数与数列'],
  sci_math_planimetry: ['理数', '平面几何'],
  sci_math_solidGeometry: ['理数', '立体几何'],
  sci_math_derivative: ['理数', '导函数'],
  sci_math_statistics: ['理数', '概率统计'],
  sci_math_appliedMath: ['理数', '应用数学'],
  lib_math_function: ['文数', '函数方程'],
  lib_math_series: ['文数', '数与数列'],
  lib_math_planimetry: ['文数', '平面几何'],
  lib_math_solidGeometry: ['文数', '立体几何'],
  lib_math_derivative: ['文数', '导函数'],
  lib_math_statistics: ['文数', '概率统计'],
  lib_math_appliedMath: ['文数', '应用数学']
}

export default mockData;

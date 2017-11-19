let util = {

};
util.config = {
  //url:'http://localhost:2017'
  url:'http://47.94.94.52:2017'
}
util.title = function (title) {
 let  title1 = title || '百战百胜';
  window.document.title = title1;
};


export default util;

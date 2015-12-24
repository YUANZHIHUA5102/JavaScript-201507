var createXHR = (function () {
    if ("XMLHttpRequest" in window) {
        return function () {
            return new XMLHttpRequest();
        }
    }
    if (new ActiveXObject("Microsoft.XMLHTTP")) {
        return function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    if (new ActiveXObject("Msxml2.XMLHTTP")) {
        return function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }
    }
    if (new ActiveXObject("Msxml3.XMLHTTP")) {
        return function () {
            return new ActiveXObject("Msxml3.XMLHTTP");
        }
    }
})();

var utils = {
    toJSON: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    },
  /*  ajax是异步编程，通过ajax获取数据，通过回调函数传出数据*/
    ajax: function (url, callback) {
        var _this = this;//此时的this是utils
        url += url.indexOf("?") > -1 ? "&_=" + Math.random() : "?_=" + Math.random();//清除缓存的方法是添加一些随机数，
        var xhr = createXHR();//第一步创建对象并执行
        xhr.open("get", url);//第二部，发送我们的请求，打开我们的链接（采用“get”方法，并把url地址复制）
        xhr.onreadystatechange = function () {//第三部，监听一个状态
            if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {//数据请求成功
                var val = this.responseText;//得到值，就是得到结果是一个字符串
                val = _this.toJSON(val);//调用utils下的toJSon方法，使其val是toJSon下的对象
                typeof callback === "function" ? callback(val) : null;//判断这个回调函数是否为函数，是的话就传，不是的话就啥也不干
            }
        };
        xhr.send();//第四部，发送请求
    }
};
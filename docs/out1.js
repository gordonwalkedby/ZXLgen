"use strict";
// 根据id获得元素，如果为null就throw
function GetElementById(id) {
    var e = document.getElementById(id);
    if (e == null) {
        throw "#" + id + " is null.";
    }
    return e;
}
// 获取链接的请求组合
function getQueryValues(url) {
    if (url === void 0) { url = ""; }
    if (url.length < 2) {
        url = document.URL;
    }
    var map = {};
    if (url.indexOf("?") < 0)
        return map;
    var str = url.split("?")[1];
    if (str.indexOf("&") < 0) {
        if (str.indexOf("=") < 0)
            return map;
        var arr = str.split("=");
        map[arr[0]] = decodeURI(arr[1]);
        return map;
    }
    var ls = str.split("&");
    for (var i = 0; i < ls.length; i++) {
        var arr = ls[i].split("=");
        if (arr[0].length < 1) {
            continue;
        }
        map[arr[0]] = decodeURI(arr[1]);
    }
    return map;
}
//从数组里随便选一个
function GetRandomItem(s) {
    if (s.length < 1) {
        return "";
    }
    var r = Math.floor(Math.random() * s.length);
    return s[r];
}
// 把文本转换为HTML格式
function HTMLEncodeText(s) {
    var div = document.createElement("div");
    div.innerText = s;
    return div.innerHTML;
}
// 把回车替换为单个空格
function ReplcaeCRLF(s) {
    s = s.replace(/\n/gi, " ");
    return s;
}
/// <reference path = "interfaces.ts" />
/// <reference path = "helpers.ts" />
// 初始化
var editor = GetElementById("editor");
var qus = getQueryValues();
var currentType = "";
(function () {
    var selecttypeDiv = GetElementById("selecttype");
    var list = selecttypeDiv.getElementsByTagName("input");
    for (var i = 0; i < list.length; i++) {
        var inputs = list.item(i);
        if (inputs == null) {
            throw "有一个 selecttype input 是null";
        }
        inputs.addEventListener("change", function () {
            ChangeType(this.value);
        });
        if (currentType.length < 1) {
            inputs.checked = true;
            ChangeType(inputs.value);
        }
    }
    var button = GetElementById("genbutton");
    button.addEventListener("click", function () {
        var v = GetInputValues();
        GenDiv(v);
    });
    var vv = qus["vv"];
    if (vv != null) {
        var obj = JSON.parse(vv);
        ChangeType(obj.type);
        var e = GetElementById("t1");
        e.value = obj.t1;
        e = GetElementById("t2");
        e.value = obj.t2;
        GenDiv(obj);
    }
})();
// 根据类型，修改文本输入的标题
function ChangeType(tp) {
    currentType = tp;
    var a = "Error";
    var b = "Error";
    switch (tp) {
        case "strong":
            a = "概要";
            b = "详细";
            break;
        case "since":
            a = "因为";
            b = "结果";
            break;
        case "update":
            a = "概要";
            b = "详细";
            break;
        default:
            break;
    }
    var text1 = GetElementById("text1");
    text1.innerText = a + "：";
    var text2 = GetElementById("text2");
    text2.innerText = b + "：";
}
// 获取用户输入的内容
function GetInputValues() {
    var vv = {
        type: currentType,
        t1: "error",
        t2: "error"
    };
    var e = GetElementById("t1");
    vv.t1 = ReplcaeCRLF(e.value).trim();
    if (vv.t1.length < 1) {
        alert("请输入不为空的内容！");
        throw "error";
    }
    e = GetElementById("t2");
    vv.t2 = ReplcaeCRLF(e.value).trim();
    if (vv.t2.length < 1) {
        alert("请输入不为空的内容！");
        throw "error";
    }
    return vv;
}
// 生成分享链接
function GenURL(v) {
    var head = location.protocol + "//" + location.host + location.pathname;
    var query = "?";
    query += "vv=" + JSON.stringify(v);
    return head + query;
}
//输出最终的div
function GenDiv(v) {
    var d = new Date();
    d.setDate(d.getDate() + Math.random() * 365 + 19);
    var time = (d.getMonth() + 1).toFixed() + "月" + d.getDate().toFixed() + "日";
    var h = "";
    switch (v.type) {
        case "strong":
            h = "【<span class='weibo_url'>#张小龙声称：";
            h += HTMLEncodeText(v.t1);
            h += "</span>】";
            h += time;
            h += "，在" + GetRandomItem(["微信工作季度总结会议", "微信之夜", "腾讯开发者大会", "腾讯顶层产品会议", "开放互联网交流论坛"]);
            h += "上，张小龙称当初绝对没想到微信现在会是这样。目前每天有10.9亿人打开微信，有7.8亿人进入朋友圈。张小龙称自己觉得特别一点要强调一下，那就是";
            h += HTMLEncodeText(v.t1);
            h += "。" + HTMLEncodeText(v.t2) + "。";
            h += "<br>为什么是这样的呢？张小龙谈起了微信诞生的故事，原因出人意料地简单，”因为我不用QQ，希望有一个适合自己的通讯工具来用，于是就开始了微信的第一版。”如果要用两个词形容微信，张小龙认为，一个是连接，一个是简单。";
            h += "<br>“这样的话，我和团队，才会为我们的工作而感到骄傲，并且觉得有意义”，张小龙说道。<span class='weibo_url_icon'></span><span class='weibo_url'>微信张小龙声称：";
            var ss = v.t1;
            if (ss.length > 5) {
                ss = ss.substring(0, 5) + "...";
            }
            h += HTMLEncodeText(ss) + "</span>";
            break;
        default:
            break;
    }
    var render = GetElementById("textrender");
    render.innerHTML = h;
}

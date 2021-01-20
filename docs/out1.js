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
//把文本变成qrcode
function GenQRcode(text) {
    if (text.length < 1) {
        throw "bad input";
    }
    var arr = [];
    arr[0] = 0;
    arr[1] = 17;
    arr[2] = 32;
    arr[3] = 53;
    arr[4] = 78;
    arr[5] = 106;
    arr[6] = 134;
    arr[7] = 154;
    arr[8] = 192;
    arr[9] = 230;
    arr[10] = 271;
    arr[11] = 321;
    arr[12] = 367;
    arr[13] = 425;
    arr[14] = 458;
    arr[15] = 520;
    arr[16] = 586;
    arr[17] = 644;
    arr[18] = 718;
    arr[19] = 792;
    arr[20] = 858;
    arr[21] = 929;
    arr[22] = 1003;
    arr[23] = 1091;
    arr[24] = 1171;
    arr[25] = 1273;
    arr[26] = 1367;
    arr[27] = 1465;
    arr[28] = 1528;
    arr[29] = 1628;
    arr[30] = 1732;
    arr[31] = 1840;
    arr[32] = 1952;
    arr[33] = 2068;
    arr[34] = 2188;
    arr[35] = 2303;
    arr[36] = 2431;
    arr[37] = 2563;
    arr[38] = 2699;
    arr[39] = 2809;
    arr[40] = 2953;
    var tp = 1;
    for (var i = 1; i < 40; i++) {
        if (text.length <= arr[i]) {
            tp = i;
            break;
        }
    }
    console.log(text, tp);
    var html = create_qrcode(text, tp, "L", "Byte", "UTF-8");
    var div = document.createElement("div");
    div.innerHTML = html;
    var img = div.getElementsByTagName("img")[0];
    return img;
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
        BuildFinalImage(v);
    });
    var vv = qus["vv"];
    if (vv != null) {
        var obj = JSON.parse(vv);
        ChangeType(obj.type);
        var e = GetElementById("t1");
        e.value = obj.t1;
        e = GetElementById("t2");
        e.value = obj.t2;
        BuildFinalImage(obj);
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
    return head + encodeURI(query);
}
//获得他说的某一句话
function GetSpeech(used) {
    if (used === void 0) { used = []; }
    var sp = ["“这样的话，我和团队，才会为我们的工作而感到骄傲，并且觉得有意义”，张小龙说道。",
        "简单是美观、实用、合理、优雅的代名词。“一个产品有10亿人用的时候，简单才会好用”",
        "张小龙用《孙子兵法》中的八个字形容自己做产品的思路——“其徐如林，其疾如风”，要么三天内找到解决方法，要么放弃寻找新路径，“如果要做，就要非常快速地迭代”。 ",
        "据统计，有3.6亿微信用户读公众号文章，4亿微信用户使用小程序。",
        "张小龙说：“所有这些都是很有趣的事情。所以做产品绝不是枯燥无味的。虽然大多数想法都会是行不通的，但有少数的能行得通，就非常好了。”",
        "微信的确加了很多功能，但那些功能，其实只有在你「把微信作为方法」的时候，它才会出现。",
        "张小龙提到：以前在饭否，看到很多产品越做越复杂，我吐槽说，“一个产品，要加多少功能，才能成为一个垃圾产品啊！” 不是说加功能会让产品不好，而是加了不必要的功能，或者加功能的方式不对。 ",
        "在最后，他说：“希望我没有浪费你的时间。再见。”",
        "张小龙认为做产品就是应该快的。",
        "为什么是这样的呢？张小龙谈起了微信诞生的故事，原因出人意料地简单，”因为我不用QQ，希望有一个适合自己的通讯工具来用，于是就开始了微信的第一版。”",
        "如果要用两个词形容微信，张小龙认为，一个是连接，一个是简单。"];
    if (used.length > 0 && used.length < sp.length) {
        while (true) {
            var s = GetRandomItem(sp);
            if (used.indexOf(s) < 0) {
                return s;
            }
        }
    }
    return GetRandomItem(sp);
}
//输出到预渲染div
function GenDiv(v) {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    var time = (d.getMonth() + 1).toFixed() + "月" + d.getDate().toFixed() + "日";
    var h = "";
    var usedSpeech = [];
    var t1 = HTMLEncodeText(v.t1);
    var t2 = HTMLEncodeText(v.t2);
    var ss;
    var s;
    switch (v.type) {
        case "strong":
            usedSpeech.push("在最后，他说：“希望我没有浪费你的时间。再见。”");
            h = "【<span class='weibo_url'>#张小龙强调：";
            h += t1;
            h += "</span>】";
            h += time;
            h += "，在" + GetRandomItem(["微信工作季度总结会议", "微信之夜", "腾讯开发者大会", "腾讯顶层产品会议", "开放互联网交流论坛"]);
            h += "上，张小龙称当初绝对没想到微信现在会是这样。目前每天有10.9亿人打开微信，有7.8亿人进入朋友圈。张小龙称自己觉得特别一点要指出一下，那就是";
            h += t1 + "。" + t2 + "。";
            s = GetSpeech(usedSpeech);
            usedSpeech.push(s);
            h += "<br>" + s;
            s = GetSpeech(usedSpeech);
            h += s;
            h += "<br>" + usedSpeech[0] + "<span class='weibo_url_icon'></span><span class='weibo_url'>微信张小龙声称：";
            ss = v.t1;
            if (ss.length > 5) {
                ss = ss.substring(0, 5) + "...";
            }
            h += HTMLEncodeText(ss) + "</span>";
            break;
        case "since":
            h = "【<span class='weibo_url'>#张小龙解答";
            h += t2;
            h += "的原因</span>】";
            h += "在" + time + "召开的" + GetRandomItem(["微信工作季度总结会议", "微信之夜", "腾讯开发者大会", "腾讯顶层产品会议", "开放互联网交流论坛"]);
            s = GetSpeech();
            usedSpeech.push(s);
            h += "上，张小龙解答了一个重要的问题。为什么" + t2 + "？" + s + "<br>张小龙说：“这主要还是因为" + t1 + "”";
            s = GetSpeech(usedSpeech);
            ss = v.t1;
            if (ss.length > 6) {
                ss = ss.substring(0, 6) + "...";
            }
            h += s + "<span class='weibo_url_icon'></span><span class='weibo_url'>为什么" + HTMLEncodeText(ss) + "</span>";
        case "update":
            h = "【<span class='weibo_url'>#微信" + GetRandomItem(["将更新", "即将推出"]) + "：";
            h += t1;
            h += "</span>】";
            h += "在" + time + "举办的" + GetRandomItem(["微信工作季度总结会议", "微信之夜", "腾讯开发者大会", "腾讯顶层产品会议", "开放互联网交流论坛"]);
            h += "上，微信的创始人张小龙提到了微信即将推出的全新的功能：“" + t1 + "”，据称，这将带来非常不一样的体验。";
            s = GetSpeech();
            usedSpeech.push(s);
            h += s + "<br>";
            h += "据悉，" + t2 + "是张小龙非常重视的一个设计。";
            s = GetSpeech(usedSpeech);
            usedSpeech.push(s);
            h += s + "但是张小龙拒绝透露更多信息。";
            s = GetSpeech(usedSpeech);
            ss = v.t1;
            if (ss.length > 8) {
                ss = ss.substring(0, 8) + "...";
            }
            h += s + "<span class='weibo_url_icon'></span><span class='weibo_url'>张小龙：微信即将更新" + HTMLEncodeText(ss) + "</span>";
            break;
        default:
            break;
    }
    var render = GetElementById("textrender");
    render.innerHTML = h;
    render.style.display = "block";
    return render;
}
var imgHead = new Image();
imgHead.src = "./base_head.jpg";
var imgBottom = new Image();
imgBottom.src = "./base_bottom.jpg";
//输出到最终图片，这包括了GenDiv
function BuildFinalImage(v) {
    var share_notice = GetElementById("share_notice");
    var outimage = GetElementById("outimage");
    outimage.src = "";
    var notice = GetElementById("notice");
    notice.style.display = "block";
    notice.innerText = "稍等，图片加载中";
    var div = GenDiv(v);
    html2canvas(div).then(function (vv) {
        div.style.display = "none";
        var img = new Image;
        img.src = vv.toDataURL();
        img.onload = function () {
            var cv = document.createElement("canvas");
            cv.width = 1080;
            cv.height = imgHead.height + img.height + imgBottom.height;
            var d2 = cv.getContext("2d");
            if (d2 == null) {
                throw "canvas 2d context is null!";
            }
            var yy = 0;
            d2.drawImage(imgHead, 0, 0);
            yy = imgHead.height;
            d2.drawImage(img, 0, yy);
            yy += img.height;
            d2.drawImage(imgBottom, 0, yy);
            var url = GenURL(v);
            var qrs = GenQRcode(url);
            qrs.onload = function () {
                if (d2 == null) {
                    throw "canvas 2d context is null!";
                }
                console.log("load out!!!");
                yy += 243;
                d2.drawImage(qrs, 435, yy, 208, 208);
                console.log(yy);
                outimage.src = cv.toDataURL();
                notice.style.display = "none";
                history.pushState("", "", url);
                share_notice.style.display = "block";
            };
        };
    });
}

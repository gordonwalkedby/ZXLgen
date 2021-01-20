/// <reference path = "interfaces.ts" />
/// <reference path = "helpers.ts" />

// 初始化
let editor = GetElementById("editor") as HTMLDivElement
let qus = getQueryValues()
let hideEditor = qus["editor"] == "0"
if (hideEditor) {
    editor.style.display = "none"
}
let currentType: string = "";
(function () {
    let selecttypeDiv = GetElementById("selecttype") as HTMLDivElement
    let list = selecttypeDiv.getElementsByTagName("input")
    for (let i = 0; i < list.length; i++) {
        let inputs = list.item(i)
        if (inputs == null) {
            throw "有一个 selecttype input 是null"
        }
        inputs.addEventListener("change", function () {
            ChangeType(this.value)
        })
        if (currentType.length < 1) {
            inputs.checked = true
            ChangeType(inputs.value)
        }
    }
    let button = GetElementById("genbutton") as HTMLButtonElement
    button.addEventListener("click", function () {
        let v = GetInputValues()
        GenDiv(v)
    })
    let vv = qus["vv"]
    if (vv != null) {
        let obj = JSON.parse(vv) as InputValues
        ChangeType(obj.type)
        let e = GetElementById("t1") as HTMLTextAreaElement
        e.value = obj.t1
        e = GetElementById("t2") as HTMLTextAreaElement
        e.value = obj.t2
        GenDiv(obj)
    }
})();

// 根据类型，修改文本输入的标题
function ChangeType(tp: string) {
    currentType = tp
    let a = "Error"
    let b = "Error"
    switch (tp) {
        case "strong":
            a = "概要"
            b = "详细"
            break;
        case "since":
            a = "因为"
            b = "结果"
            break;
        case "update":
            a = "概要"
            b = "详细"
            break;
        default:
            break;
    }
    let text1 = GetElementById("text1")
    text1.innerText = a + "："
    let text2 = GetElementById("text2")
    text2.innerText = b + "："
}

// 获取用户输入的内容
function GetInputValues(): InputValues {
    let vv: InputValues = {
        type: currentType,
        t1: "error",
        t2: "error"
    }
    let e = GetElementById("t1") as HTMLTextAreaElement
    vv.t1 = ReplcaeCRLF(e.value).trim()
    if (vv.t1.length < 1) {
        alert("请输入不为空的内容！")
        throw "error"
    }
    e = GetElementById("t2") as HTMLTextAreaElement
    vv.t2 = ReplcaeCRLF(e.value).trim()
    if (vv.t2.length < 1) {
        alert("请输入不为空的内容！")
        throw "error"
    }
    return vv
}

// 生成分享链接
function GenURL(v: InputValues, hideEditor: boolean): string {
    let head: string = location.protocol + "//" + location.host + location.pathname
    let query: string = "?"
    if (hideEditor) {
        query += "editor=0&"
    }
    query += "vv=" + JSON.stringify(v)
    return head + query
}

//输出最终的div
function GenDiv(v: InputValues) {
    let d = new Date()
    d.setDate(d.getDate() + Math.random() * 365 + 19)
    let time = (d.getMonth() + 1).toFixed() + "月" + d.getDate().toFixed() + "日"
    let h = ""
    switch (v.type) {
        case "strong":
            h = "【<span class='weibo_url'>#张小龙声称："
            h += HTMLEncodeText(v.t1)
            h += "</span>】"
            h += time
            h += "，在" + GetRandomItem(["微信工作季度总结会议", "微信之夜", "腾讯开发者大会", "腾讯顶层产品会议", "开放互联网交流论坛"])
            h += "上，张小龙称当初绝对没想到微信现在会是这样。目前每天有10.9亿人打开微信，有7.8亿人进入朋友圈。张小龙称自己觉得特别一点要强调一下，那就是"
            h += HTMLEncodeText(v.t1)
            h += "。" + HTMLEncodeText(v.t2) + "。"
            h += "<br>为什么是这样的呢？张小龙谈起了微信诞生的故事，原因出人意料地简单，”因为我不用QQ，希望有一个适合自己的通讯工具来用，于是就开始了微信的第一版。”如果要用两个词形容微信，张小龙认为，一个是连接，一个是简单。"
            h += "<br>“这样的话，我和团队，才会为我们的工作而感到骄傲，并且觉得有意义”，张小龙说道。<span class='weibo_url_icon'></span><span class='weibo_url'>微信张小龙声称："
            let ss = v.t1
            if (ss.length > 5) {
                ss = ss.substring(0, 5) + "..."
            }
            h += HTMLEncodeText(ss) + "</span>"
            break;
        default:
            break;
    }
    let render = GetElementById("textrender")
    render.innerHTML = h
}

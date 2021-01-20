// 根据id获得元素，如果为null就throw
function GetElementById(id: string): HTMLElement {
    let e = document.getElementById(id)
    if (e == null) {
        throw "#" + id + " is null."
    }
    return e
}

// 获取链接的请求组合
function getQueryValues(url: string = ""): { [key: string]: string } {
    if (url.length < 2) {
        url = document.URL
    }
    let map: { [key: string]: string } = {}
    if (url.indexOf("?") < 0) return map;
    let str = url.split("?")[1];
    if (str.indexOf("&") < 0) {
        if (str.indexOf("=") < 0) return map;
        let arr = str.split("=");
        map[arr[0]] = decodeURI(arr[1])
        return map;
    }
    let ls = str.split("&");
    for (let i = 0; i < ls.length; i++) {
        let arr = ls[i].split("=");
        if (arr[0].length < 1) { continue }
        map[arr[0]] = decodeURI(arr[1])
    }
    return map
}

//从数组里随便选一个
function GetRandomItem(s: string[]): string {
    if (s.length < 1) { return "" }
    let r = Math.floor(Math.random() * s.length)
    return s[r]
}

// 把文本转换为HTML格式
function HTMLEncodeText(s: string): string {
    let div = document.createElement("div")
    div.innerText = s
    return div.innerHTML
}

// 把回车替换为单个空格
function ReplcaeCRLF(s: string): string {
    s = s.replace(/\n/gi, " ")
    return s
}

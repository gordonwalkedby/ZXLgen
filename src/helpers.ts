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

//把文本变成qrcode
function GenQRcode(text: string): HTMLImageElement {
    if (text.length < 1) {
        throw "bad input"
    }
    let arr: number[] = []
    arr[0] = 0
    arr[1] = 17
    arr[2] = 32
    arr[3] = 53
    arr[4] = 78
    arr[5] = 106
    arr[6] = 134
    arr[7] = 154
    arr[8] = 192
    arr[9] = 230
    arr[10] = 271
    arr[11] = 321
    arr[12] = 367
    arr[13] = 425
    arr[14] = 458
    arr[15] = 520
    arr[16] = 586
    arr[17] = 644
    arr[18] = 718
    arr[19] = 792
    arr[20] = 858
    arr[21] = 929
    arr[22] = 1003
    arr[23] = 1091
    arr[24] = 1171
    arr[25] = 1273
    arr[26] = 1367
    arr[27] = 1465
    arr[28] = 1528
    arr[29] = 1628
    arr[30] = 1732
    arr[31] = 1840
    arr[32] = 1952
    arr[33] = 2068
    arr[34] = 2188
    arr[35] = 2303
    arr[36] = 2431
    arr[37] = 2563
    arr[38] = 2699
    arr[39] = 2809
    arr[40] = 2953
    let tp = 1
    for (let i = 1; i < 40; i++) {
        if (text.length <= arr[i]) {
            tp = i
            break
        }
    }
    console.log(text, tp)
    let html = create_qrcode(text, tp, "L", "Byte", "UTF-8")
    let div = document.createElement("div")
    div.innerHTML = html
    let img = div.getElementsByTagName("img")[0]
    return img
}

function hexToRgba(hex, opacity) {

    let i;
    let sColor = hex.toLowerCase();
    //十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = "#";
            for (i = 1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        const sColorChange = [];
        for (i = 1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));
        }
        return "rgba(" + sColorChange.join(",") + ", " + opacity + ")";
    }
    return sColor;

}

function qqFacer() {

    const exclude = [

        17, 40, 44, 45, 47, 48, 50, 51, 52, 58, 65, 68, 70, 71,
        73, 80, 81, 82, 83, 84, 87, 88, 92, 93, 94, 95, 135, 195,
        196, 209, 213

    ]

    const array = []

    let average = 221 / 5

    for(let i = 0;i < average;++i) {

        const subArray = []

        for(let j = 0;j < 5;++j) {

            const order = i * 5 + j

            if(exclude.includes(order) || order > 221) continue

            subArray.push({ gif: require(`./../../../assets/qq_face/${order}/qq-face.gif`),
                png: require(`./../../../assets/qq_face/${order}/qq-face_static.png`), order })

        }

        array.push(subArray)

    }

    return {

        array, average

    }

}

module.exports = {
    hexToRgba, qqFacer
}

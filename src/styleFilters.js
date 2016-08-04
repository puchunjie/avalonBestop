/**
 * Created by puchunjie on 16/7/20.
 */
//str为管道符之前计算得到的结果，默认框架会帮你传入，此方法必须返回一个值
avalon.filters.styleName = function (str, args, args2) {
    /* 具体逻辑 */
    var ret;
    switch(str){
        case 'width':ret = '宽度'
            break;
        case 'height':ret = '高度'
            break;
        case 'left':ret = '左偏移'
            break;
        case 'top':ret = '上偏移'
            break;
        case 'padding':ret = '内边距'
            break;
        case 'paddingTop':ret = '上边距'
            break;
        case 'paddingRight':ret = '右边距'
            break;
        case 'paddingBottom':ret = '下边距'
            break;
        case 'paddingLeft':ret = '左边距'
            break;
        case 'margin':ret = '外边距'
            break;
        case 'marginLeft':ret = '左外边距'
            break;
        case 'marginRight':ret = '右外边距'
            break;
        case 'marginTop':ret = '上外边距'
            break;
        case 'marginBottom':ret = '下外边距'
            break;
        case 'borderWidth':ret = '边框像素'
            break;
        case 'borderStyle':ret = '边框样式'
            break;
        case 'borderColor':ret = '边框颜色'
            break;
        case 'backgroundColor':ret = '背景颜色'
            break;
        case 'color':ret = '字体颜色'
            break;
        case 'pictures':ret = '图片'
            break;
        default : ret = str
            break;
    }

    return ret;
}



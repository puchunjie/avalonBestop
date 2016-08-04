/**
 * Created by puchunjie on 16/8/4.
 * 常用到的公共小方法封装集合
 */
require('jquery')
var Tools = {
    //判断对象是否为空
    isEmptyObject: function (obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    }
}

exports.Tools = Tools
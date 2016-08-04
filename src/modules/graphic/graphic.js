/**
 * Created by puchunjie on 16/7/7.
 */
var avalon = require('avalon')
var modInit = require('moduleInit')
require('text!./graphic.css')

avalon.component('ms-graphic', {
    template: require('text!./graphic.html'),
    defaults: {
        onReady: function () {
            modInit.moduleInit(this)
        },
        flag: true,
        addHoverStyle: function () {
            this.flag = !this.flag
        },
        removeHoverStyle: function () {
            this.flag = !this.flag
        },
        "moduleName": "graphic",
        "moduleId": "",
        "tools": [
            {
                "name": "设置",
                "type": "settings",
                "icon": "icon-shezhi"
            },
            {
                "name": "删除",
                "type": "delete",
                "icon": "icon-shanchu"
            },
            {
                "name": "复制",
                "type": "copy",
                "icon": "icon-fuzhi"
            }
        ],
        "moduleSet": {
            "styleType": {
                "name": "皮肤选择"
            },
            "outLook": {
                "width": 500,
                "height": 500,
                "backgroundColor": "#ccc",
                "left": 0,
                "top": 0,
                "margin": 10,
                "color": "#000",
                "display": "inline-block",
                "overflow": "hidden",
                "cursor": "move",
                "position": "absolute"
            },
            "moduleTitle": {
                "isShow": true,
                "styles": {}
            },
            "moduleContent": {
                "title": "产品1",
                "href": "http://www.baidu.com",
                "picSrc": "http://wxxy.swun.edu.cn/_mediafile/wxxy/2014/10/31/28jskyf7zt.jpg",
                "des": "产品描述1产品描述1产品描述1产品描述1产品描述1产品描述1产品描述1产品描述1产品描述1产品描述1"
            },
            "advancedSetting": {
                "details": "sdadsadsadasd"
            }
        }
    }
})


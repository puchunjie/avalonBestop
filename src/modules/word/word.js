/**
 * Created by puchunjie on 16/7/7.
 */
var avalon = require('avalon')
var modInit = require('moduleInit')

avalon.component('ms-word', {
    template: require('text!./word.html'),
    defaults: {
        onReady: function () {
            //模块初始化
            modInit.moduleInit(this)
        },
        addHoverStyle: function () {
            this.flag = !this.flag
        },
        removeHoverStyle: function () {
            this.flag = !this.flag
        },
        "moduleName": "word",
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
        "flag": true,
        "moduleSet": {
            "outLook": {
                "styles": {
                    "borderRadius": 5,
                    "width": 100,
                    "height": 100,
                    "left": 0,
                    "top": 0,
                    "paddingTop": 0,
                    "paddingRight": 0,
                    "paddingBottom": 0,
                    "paddingLeft": 0,
                    "cursor": "move",
                    "position": "absolute"
                },
                "beforeHover": {
                    "backgroundColor": "red",
                    "backgroundImage": "none",
                    "backgroundPosition": "left center",
                    "backgroundRepeat": "repeat-x",
                    "borderTopColor": "#fff",
                    "borderTopWidth": 1,
                    "borderTopStyle": "dashed",
                    "borderBottomColor": "#000",
                    "borderBottomWidth": 2,
                    "borderBottomStyle": "solid",
                    "borderLeftColor": "#eee",
                    "borderLeftWidth": 3,
                    "borderLeftStyle": "dashed",
                    "borderRightColor": "#c01",
                    "borderRightWidth": 4,
                    "borderRightStyle": "dashed"
                },
                "hoverStyle": {
                    "backgroundColor": "#ccc",
                    "backgroundImage": "none",
                    "backgroundPosition": "left center",
                    "backgroundRepeat": "repeat-x",
                    "borderTopColor": "#fff",
                    "borderTopWidth": 1,
                    "borderTopStyle": "dashed",
                    "borderBottomColor": "#000",
                    "borderBottomWidth": 2,
                    "borderBottomStyle": "solid",
                    "borderLeftColor": "#eee",
                    "borderLeftWidth": 10,
                    "borderLeftStyle": "dashed",
                    "borderRightColor": "#c01",
                    "borderRightWidth": 8,
                    "borderRightStyle": "dashed"
                }
            },
            "moduleTitle": {
                "isShow": true,
                "styles": {}
            },
            "moduleContent": {},
            "advancedSetting": null
        }
    }

})

avalon.component('ms-wordset', {
    template: require('text!./wordset.html'),
    defaults: {
        "worddetails": "sdadsadsadasd"
    }
})
/**
 * Created by puchunjie on 16/7/20.
 */
var avalon = require('avalon')
var modInit = require('moduleInit')
require('text!./picture.css')

avalon.component('ms-picture', {
    template: require('text!./picture.html'),
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
        "moduleName": "picture",
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
            "styleType": {},
            "outLook": {
                "width": 100,
                "height": 100,
                "left": 0,
                "top": 0,
                "paddingTop": 0,
                "paddingRight": 0,
                "paddingBottom": 0,
                "paddingLeft": 0,
                "borderWidth": 10,
                "borderStyle": "solid",
                "borderColor": "#ccc",
                "cursor": "move",
                "position": "absolute"
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

//高级设置面板
avalon.component('ms-pictureset', {
    template: require('text!./pictureset.html'),
    defaults: {
        "src": "http://ftp.ytbbs.com/attachments/forum/201404/14/165935vfzw45q2574ggvii.gif",
        "href": "bst.index.html",
        "target": "_blank"
    }
})


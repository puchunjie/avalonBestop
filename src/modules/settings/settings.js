/**
 * Created by puchunjie on 16/7/14.
 */
var avalon = require('avalon')
require('colorpicker')//颜色拾取插件
var cp = require('colorpickerInit')


require('../../assets/vendor/UEditor/ueditor.config')
require('../../assets/vendor/UEditor/ueditor.all')
require('../../assets/vendor/UEditor/lang/zh-cn/zh-cn')
require('text!./settings.css')
require('text!../../assets/vendor/colorpicker/jquery.minicolors.css')

avalon.component('ms-settings', {
    template: require('text!./settings.html'),
    defaults: {
        onReady: function () {
            //初始化颜色拾取
            cp.colorPickerInit(this)
            //初始化富文本编辑器
            UEditorInit();
        },
        onViewChange: function () {
            UEditorInit();
        },
        showPanel:function(target){
            $(".attribute-wrap > div").fadeOut(200)
            $('.'+target).fadeIn(200)
        },
        setDefault: function (val,oldVal,key) {
            //参数说明:val-属性父对象集合,oldVal-默认值存储集合,key-当前属性的key值、及属性名
            //隐藏所有自定义属性面板
            $(".attribute-custom").hide()
            //批量恢复默认属性
           for(var i=0;i<val.length;i++){
               val[i][key[i]] = oldVal[i]
           }
        },
        showCustom: function (e) {
            $(e.target).siblings(".attribute-custom").show()
        },
        setFliter: function (e) {
            $(e.target).siblings(".minicolors").find("input").val('')
            $(e.target).siblings(".minicolors").find(".minicolors-swatch-color").attr("style","")
            var keys = $(e.target).siblings(".minicolors").find("input").attr('valName').split(".")
            this[keys[0]][keys[1]][keys[2]][keys[3]] = ''
        },
        "outLook": {
            "backgroundColor":"#ccc",
            "backgroundImage":"none",
            "backgroundPosition":"left center",
            "borderRadius":0,
            "width": 100,
            "height": 100,
            "left": 0,
            "top": 0,
            "paddingTop":0,
            "paddingRight":0,
            "paddingBottom":0,
            "paddingLeft":0,
            "borderWidth":1,
            "borderStyle":"solid",
            "borderColor":"#ccc",
            "cursor": "move",
            "position": "absolute"
        },
        "moduleTitle": {
            "isShow":true,
            "styles":{}

        },
        "moduleContent": {},
        "advancedSetting": null
    }
})


function hiddenCustom(item){
    if(!$(item).siblings(".attribute-custom").is(":hidden")){
        $(item).siblings(".attribute-custom").hide()
    }
}

//初始化富文本编辑器
function UEditorInit(){
    if($("#container").length > 0){
        var ue = UE.getEditor('container');
        console.log("富文本编辑器初始化成功")
    }
}
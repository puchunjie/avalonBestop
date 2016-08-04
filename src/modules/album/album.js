var avalon = require('avalon');
var $ = require('jquery');

require('flexslider');
require('superSlide');
require('text!./album.css');
var hr;
avalon.component('ms-album', {
    template: require('text!./album.html'),
    defaults: {
        onReady: function () {
            $(".slideBox").slide({
                mainCell:".albumItem ul",
                effect:this.moduleSet.advancedSetting.albumStyleDefaule.albumeffect,      //效果
                trigger:this.moduleSet.advancedSetting.albumStyleDefaule.albumtrigger,        //触发方式
                interTime:this.moduleSet.advancedSetting.albumStyleDefaule.albuminterTime,       //播放间隔
                delayTime:this.moduleSet.advancedSetting.albumStyleDefaule.albumdelayTime,          //效果速度
                pnLoop:this.moduleSet.advancedSetting.albumStyleDefaulealbumpnLoop,            //前后按钮循环
                autoPlay:this.moduleSet.advancedSetting.albumStyleDefaule.albumautoPlay,         //自动运行
                easing:this.moduleSet.advancedSetting.albumStyleDefaule.albumswing,         //缓动方式
                mouseOverStop:this.moduleSet.advancedSetting.albumStyleDefaule.albummouseOverStop,    //鼠标经过
                defaultPlay:this.moduleSet.advancedSetting.albumStyleDefaule.albumDefaultPlay,
                vis:this.moduleSet.advancedSetting.albumStyleDefaule.albumVis,
                scroll:this.moduleSet.advancedSetting.albumStyleDefaule.albumScroll
            });
            var _this = this;
            $(this.$element).draggable({
                containment: ".bst-main-view",
                stack: ".bst-banner-content .bst-module",
                snap: true,
                start: function (event, ui) {
                    //开始移动模块的时候,关闭工具条
                    avalon.vmodels.toolbar.ishide = false
                },
                stop: function () {
                    _this.moduleSet.outLook.styles.left = Number($(this).css("left").replace("px", ""))
                    _this.moduleSet.outLook.styles.top = Number($(this).css("top").replace("px", ""))
                }
            }).resizable({
                autoHide: true,
                stop: function () {
                    _this.moduleSet.outLook.styles.width = Number($(this).css("width").replace("px", ""))
                    _this.moduleSet.outLook.styles.height = Number($(this).css("height").replace("px", ""))
                    //如果模块超出了通栏,则把通栏的高度自适应
                    var moduleHeight = $(this).outerHeight(true)
                    var moduleTop = Number($(this).css("top").replace("px", ""))
                    var banner = $(this).parent()
                    var bannerId = $(this).parent().attr("wid").split("_")[1]
                    if ((moduleHeight + moduleTop) > banner.height()) {
                        banner.height(moduleHeight + moduleTop)
                        var old = avalon.vmodels.app.$model.layouts[bannerId]
                        old.styles.height = moduleHeight + moduleTop
                        avalon.vmodels.app.layouts[bannerId] = old
                    }
                }
            }); //真实dom生成后绑定拖动函数
        },
        flag: true,
        onViewChange:function () {
            $(".slideBox").slide({
                mainCell:".albumItem ul",
                effect:this.moduleSet.advancedSetting.albumStyleDefaule.albumeffect,      //效果
                trigger:this.moduleSet.advancedSetting.albumStyleDefaule.albumtrigger,        //触发方式
                interTime:this.moduleSet.advancedSetting.albumStyleDefaule.albuminterTime,       //播放间隔
                delayTime:this.moduleSet.advancedSetting.albumStyleDefaule.albumdelayTime,          //效果速度
                pnLoop:this.moduleSet.advancedSetting.albumStyleDefaulealbumpnLoop,            //前后按钮循环
                autoPlay:this.moduleSet.advancedSetting.albumStyleDefaule.albumautoPlay,         //自动运行
                easing:this.moduleSet.advancedSetting.albumStyleDefaule.albumswing,         //缓动方式
                mouseOverStop:this.moduleSet.advancedSetting.albumStyleDefaule.albummouseOverStop,    //鼠标经过
                defaultPlay:this.moduleSet.advancedSetting.albumStyleDefaule.albumDefaultPlay,
                vis:this.moduleSet.advancedSetting.albumStyleDefaule.albumVis,
                scroll:this.moduleSet.advancedSetting.albumStyleDefaule.albumScroll
            });
        },
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
});
exports.albumInti = function() {
    console.log(this)
};

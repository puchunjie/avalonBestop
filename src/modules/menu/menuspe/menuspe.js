/**
 * Created by puchunjie on 16/6/30.
 */
var avalon = require('avalon')
require('text!./style.css')



avalon.component('ms-menu', {
    template: require('text!./menuspe.html'),
    defaults: {
            	onReady: function () {
                    var _this = this
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
                            var bannerId = Number($(this).parent().attr("wid").split("_")[1])
                            if ((moduleHeight + moduleTop) > banner.height()) {
                                banner.height(moduleHeight + moduleTop)
                                avalon.vmodels.app.layouts[bannerId].styles.height = moduleHeight + moduleTop
                            }
                        }
                    }) //真是dom生成后绑定拖动函数

                    $(this.$element).children(".ui-resizable-s").remove()
                },
                addHoverStyle:function(a){
                    console.log(a)
                    a.flag = !a.flag
                    // console.log("qqqqq")
                },
                removeHoverStyle:function(a){
                    a.flag = !a.flag
                },
                mouseover:function(){

                }
        },
        
    soleSlot: 'content'
})





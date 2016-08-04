/**
 * Created by puchunjie on 16/8/3.
 * 模块初始化,参数a为当前模块vm
 */
exports.moduleInit = function (a) {
    var _this = a
    $(_this.$element).draggable({
        containment: ".bst-main-view",
        stack: ".bst-banner-content .bst-module",
        snap: true,
        start: function (event, ui) {
            //开始移动模块的时候,关闭工具条
            avalon.vmodels.toolbar.ishide = false
        },
        stop: function (event, ui) {
            var t = Number($(this).css("top").replace("px", ""))
            var l = Number($(this).css("left").replace("px", ""))
            //如果top值为负数则置0
            if (t < 0) {
                t = 0
                $(event.targe).css("top", t)
            }
            //同步偏移值到layouts中和顶部工具栏中
            _this.moduleSet.outLook.styles.top = t
            _this.moduleSet.outLook.styles.left = l

            //_this.moduleSet.outLook.styles.top = avalon.vmodels.topbar.top = t
            //_this.moduleSet.outLook.styles.left = avalon.vmodels.topbar.left = l


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
                avalon.vmodels.app.layouts[bannerId].styles.height = moduleHeight + moduleTop + 10
            }
        }
    }) //真是dom生成后绑定拖动函数
}
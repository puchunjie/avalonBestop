/**
 * Created by puchunjie on 16/8/4.
 */

exports.addWatch = function () {
    /*  ======================== 设置面板监听 =========================  */
    //监听模块公共属性的变化
    avalon.vmodels.settingspanel.$watch('baseSettingObj.moduleSet.outLook.*.*', function (a, b, name) {
        //把修改的值同步到layouts中去
        avalon.vmodels.app.layouts[this.layoutKey].slotModeules[this.slotModeulesKey].moduleSet.outLook = this.$model.baseSettingObj.moduleSet.outLook
    })
    //监听模块高级属性的变化
    avalon.vmodels.settingspanel.$watch('baseSettingObj.moduleSet.advancedSetting.*', function (a, b, name) {
        //把修改的值同步到layouts中去
        avalon.vmodels.app.layouts[this.layoutKey].slotModeules[this.slotModeulesKey].moduleSet.advancedSetting = this.$model.baseSettingObj.moduleSet.advancedSetting
    })



    /*  ======================== 导航设置面板监听 =========================  */
    //监听模块公共属性的变化
    avalon.vmodels.navpanel.$watch('settingObj.moduleSet.outLook.*.*', function (a, b, name) {
        //把修改的值同步到layouts中去
        this.settingObj.moduleSet.outLook.stylesul2.top = this.$model.settingObj.moduleSet.moduleContent.defstyles.height
        avalon.vmodels.app.layouts[this.layoutKey].slotModeules[this.slotModeulesKey] = this.$model.settingObj
        //面板修改值去同步页面变化
        avalon.vmodels[this.slotModeulesKey] = this.$model.settingObj
    })
    //监听单个li属性的变化
    avalon.vmodels.navpanel.$watch('settingObj.moduleSet.moduleContent.*.*', function (a, b, name) {
        //把修改的值同步到layouts中去
        avalon.vmodels.app.layouts[this.layoutKey].slotModeules[this.slotModeulesKey] = this.$model.settingObj
        //面板修改值去同步页面变化
        avalon.vmodels[this.slotModeulesKey] = this.$model.settingObj
    })



    /*  ======================== 顶部栏中偏移值改变同步到页面中监听 =========================  */
    //topBar.$watch('left', function (a, b,name) {
    //    vm.layouts[this.layoutKey].slotModeules[this.slotModeulesKey].moduleSet.outLook.styles[name] = a
    //})
    //topBar.$watch('top', function (a, b,name) {
    //    vm.layouts[this.layoutKey].slotModeules[this.slotModeulesKey].moduleSet.outLook.styles[name] = a
    //})
}


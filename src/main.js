/**
 * Created by Jeremy Pu on 16/06/27.
 */
/*======================== 核心库加载 -start ============================*/
var avalon = require("avalon");
require('jqueryui');
var cf = require('config');//载入通用配置项
/*======================== 核心库加载 -end ============================*/


/*======================== 样式加载 -start ============================*/
require('./assets/css/common.css');
require('./assets/css/iconfont/iconfont.css');
require('./assets/vendor/jquery-ui-1.11.4/jquery-ui.min.css');
/*======================== 样式加载 -end ============================*/


/*======================== 工具库 -start ============================*/
var watch = require('watchs')//引入vm监听器
var T = require('tools') //一些封装的公共小方法
//通栏模版数据
var bannerMod = require('./jsons/bannerModule.json')
/*======================== 工具库 -end ============================*/


/*======================== 模块载入 -start ============================*/
require('drag')
require('word')
require('tabs')
require('menuspe')
require('menubase')
require('picture')
require('settings')
require('graphic')
require('navtabs')//导航设置面板
/*======================== 模块载入 -end ============================*/

//加载avalon配置项目
cf.config.avalonInit();

/*======================== 定义一个顶层的vmodel，用来放置全局共享数据 -start ============================*/
var vm = avalon.define({
    $id: 'app',
    width: 1400,
    maskShow: false,//页面蒙板显隐
    copyModule: {},//空对象,用于存放模块复制的数据
    //添加通栏到页面方法
    addModuel: function () {
        //添加到layouts中,页面添加一个通栏模块
        bannerMod.moduleId = "drag_" + new Date().getTime()
        this.layouts.push(bannerMod)
    },
    layouts: []
})
/*======================== 定义一个顶层的vmodel，用来放置全局共享数据 -end ============================*/




/*======================== 顶层工具条 -start ============================*/
var topBar = avalon.define({
    $id: 'topbar',
    left: 0,
    top: 0,
    layoutKey: NaN,
    slotModeulesKey: '',
    moduleName: '',
    save: function () {
        var page = vm.$model.layouts
        $.when($.ajax({
            type: "POST",
            data: JSON.stringify({"key": "page", "data": page}),
            url: cf.config.uploadUrl, dataType: "json"
        })).then(function (data) {
            alert("上传成功")
        }, function () {
            alert("上传失败")
        })
    }
})
/*======================== 顶层工具条 -end ============================*/




/*======================== 左侧栏vm -start ============================*/
var leftSidebar = avalon.define({
    $id: 'leftsidebar',
    isViewbox: false,//模块缩略图容器显隐
    bars: [
        {
            name: "页面",
            icon: "icon-weibiaoti104",
            active: false,
            views: []
        },
        {
            name: "基础",
            icon: "icon-xingxing",
            active: false,
            views: [
                {
                    name: "通栏",
                    widget: "drag"
                },
                {
                    name: "文字模块",
                    widget: "word",
                    jsonKey: "word"
                },
                {
                    name: "图片模块",
                    widget: "picture",
                    jsonKey: "picture"
                },
                {
                    name: "图文模块",
                    widget: "graphic",
                    jsonKey: "graphic"
                },
                {
                    name: "基本导航",
                    widget: "menubase",
                    jsonKey: "menubase"
                },
                {
                    name: "特殊导航",
                    widget: "menuspe",
                    jsonKey: "menuspe"
                }
            ]
        },
        {
            name: "控件",
            icon: "icon-kongjian",
            active: false,
            views: []
        },
        {
            name: "插件",
            icon: "icon-yingxiaochajian",
            active: false,
            views: []
        },
        {
            name: "设置",
            icon: "icon-guanlichajian",
            active: false,
            views: []
        }
    ],
    viewModule: {},
    //模块缩略图容器显示数据
    showViewModules: function (view) {
        $("#left_bar li").removeClass("active")
        view.active = true
        this.viewModule = view.$model
        //点击大分类显示对应的模块
        this.isViewbox = !this.isViewbox
    },
    //初始化模块缩略图容器中的模块为可拖拽
    draggleInit: function () {
        $(".side-module").draggable({
            revert: "valid",
            revertDuration: 100,
            start: function () {
                $("#left_bar li").removeClass("active")
                leftSidebar.isViewbox = false
            }
        });
    },
    closeViewbox: function () {
        $("#left_bar li").removeClass("active")
        this.isViewbox = !this.isViewbox
    }

})
/*======================== 左侧栏vm -end ============================*/




/*======================== 设置面板vm -start ============================*/
var settingsPanel = avalon.define({
    $id: 'settingspanel',
    baseSettingObj: null,
    isOpen: false,  //面板显示/隐藏样式
    layoutKey: '',
    slotModeulesKey: '',
    closePanel: function () {
        //关闭设置面板
        this.isOpen = !this.isOpen
        //关闭遮罩
        vm.maskShow = !vm.maskShow
        //初始化高级设置数据,否则数据混乱
        this.baseSettingObj.moduleSet.advancedSetting = null
    }
})
/*======================== 设置面板vm -end ============================*/




/*======================== NAV设置面板vm -start ============================*/
var navPanel = avalon.define({
    $id: 'navpanel',
    isOpen: false,  //面板显示/隐藏样式
    layoutKey: '',
    slotModeulesKey: '',
    settingObj: null,
    closePanel: function () {
        this.isOpen = !this.isOpen
        vm.maskShow = !vm.maskShow
        //初始化高级设置数据,否则数据混乱
        this.baseSettingObj.moduleSet.advancedSetting = null
    }
})
/*======================== NAV设置面板vm -end ============================*/




/*======================== 模块工具条vm -start ============================*/
var toolBar = avalon.define({
    $id: 'toolbar',
    layoutKey: NaN,
    slotModeulesKey: '',
    moduleName: '',
    ishide: false,
    position: {
        top: 200,
        left: 300
    },
    tools: [],
    toolAction: function (type) {
        //打开模块设置面板
        if (type == 'settings') {
            vm.maskShow = !vm.maskShow
            toolBar.ishide = false
            if (this.moduleName !== 'menu') {
                //把模块数据传入设置面板
                settingsPanel.isOpen = !settingsPanel.isOpen
                settingsPanel.layoutKey = this.layoutKey
                settingsPanel.slotModeulesKey = this.slotModeulesKey
                //把默认数据保存下来用于设置面板恢复默认用
                var moduleJson
                var key = this.layoutKey
                //console.log(avalon.vmodels['public' + this.layoutKey].$model[this.layoutKey + 'Layouts'].slotModeules[this.slotModeulesKey])
                //判断是否是顶部或者底部通栏
                if(key !== 'header' && key !== 'footer'){
                    moduleJson = vm.$model.layouts[this.layoutKey].slotModeules[this.slotModeulesKey]
                }else{
                    moduleJson = avalon.vmodels['public' + this.layoutKey].$model[this.layoutKey + 'Layouts'].slotModeules[this.slotModeulesKey]
                }
                moduleJson.defaultObj = moduleJson.moduleSet
                settingsPanel.baseSettingObj = moduleJson
            } else {
                //把模块数据传入导航设置面板
                navPanel.isOpen = !navPanel.isOpen
                navPanel.layoutKey = this.layoutKey
                navPanel.slotModeulesKey = this.slotModeulesKey
                //navPanel.settingObj = vm.layouts[this.layoutKey].slotModeules[this.slotModeulesKey].$model
                var moduleJson = vm.layouts[this.layoutKey].slotModeules[this.slotModeulesKey].$model
                moduleJson.defaultObj = moduleJson.moduleSet
                navPanel.settingObj = moduleJson
            }
        }
        //模块内容编辑
        else if (type == 'edit') {

        }
        //删除当前模块
        else if (type == 'delete') {
            var old = vm.layouts[this.layoutKey].slotModeules.$model
            delete old[this.slotModeulesKey]
            delete avalon.vmodels[this.slotModeulesKey]//彻底删除组件自动生成的vm
            //如果对象为空了就设置成null
            old = T.Tools.isEmptyObject(old) ? null : old
            vm.layouts[this.layoutKey].slotModeules = old
            //删除完隐藏工具条
            toolBar.ishide = false
        }
        //复制当前模块
        else if (type == 'copy') {
            //把当前选中模块的数据,存放进模块复制对象中
            //vm.copyModule = vm.layouts[this.layoutKey].slotModeules[this.slotModeulesKey].$model
            copyMode(vm.layouts[this.layoutKey].slotModeules[this.slotModeulesKey].$model)
            //console.log(vm.copyModule)
        }
    }

})
/*======================== 模块工具条vm -end ============================*/




/*======================== dom渲染完毕后执行 -start ============================*/
$(function () {
    //设置面板可拖拽
    $(".bst-settings").draggable({
        containment: "document",
        handle: ".settings-header"
    })

    //给所有模块绑定点击事件,返回点击模块的数据
    $(".bst-main-view").on("click", ".bst-module", function () {
        var moduleKey = $(this).attr("wid")
        var dragKey = $(this).parent().attr("wid").split("_")[1]
        //当前选中模块的数据
        var choiseModule
        //判断是否是顶部或者底部通栏
        if(dragKey !== 'header' && dragKey !== 'footer'){
            dragKey = Number(dragKey)
            choiseModule = vm.$model.layouts[dragKey].slotModeules[moduleKey]
        }else{
            choiseModule = avalon.vmodels['public' + dragKey][dragKey + 'Layouts'].slotModeules[moduleKey]
        }

        //把当前模块的偏移值传入顶部工具栏中
        //topBar.left = choiseModule.moduleSet.outLook.styles.left
        //topBar.top = choiseModule.moduleSet.outLook.styles.top
        //记录当前数据的key值
        toolBar.layoutKey = topBar.layoutKey = dragKey
        toolBar.slotModeulesKey = topBar.slotModeulesKey = moduleKey
        toolBar.moduleName = topBar.moduleName = choiseModule.moduleName
        //把当前模块的工具条数据塞进工具条vm中
        toolBar.tools = choiseModule.tools
        //工具条为鼠标点击模块当前位置
        var nowPosition = $(this).offset()
        nowPosition.top = nowPosition.top - 30
        nowPosition.left = nowPosition.left - 10
        toolBar.position = nowPosition
        //显示工具条
        toolBar.ishide = true
    })
});
/*======================== dom渲染完毕后执行 -end ============================*/




/*======================== 根vm加载完毕后的数据处理 -start ============================*/
vm.$watch('onReady', function () {
    $.when($.ajax({
        type: "GET",
        url: cf.config.downloadUrl + "page",
        dataType: "json"
    })).then(function (data) {
        vm.layouts = data
    })
    watch.addWatch()
})
/*======================== 根vm加载完毕后的数据处理 -end ============================*/


//开始扫描编译
avalon.scan(document.body)

/**
 * Created by puchunjie on 16/7/7.
 */
var avalon = require('avalon');
var T =require('tools') //公共小方法
var cf = require('config');//载入通用配置项
require('./style.css');


avalon.component('ms-drag', {
    template: require('text!./drag.html'),
    defaults: {
        onReady: function () {
            var _this = this  //保存vm
            //真是dom生成后绑定拖动函数
            $(this.$element).resizable({
                autoHide: true,
                stop: function () {
                    _this.styles.height = Number($(this).css("height").replace("px", ""))
                }
            });
            //真是dom生成后绑定放置函数
            $(this.$element).droppable({
                activeClass: "bst-reception-wait",
                hoverClass: "bst-reception-hover",
                accept: ".draggle-module",//设置可接收元素的类型
                //完成拖入后的回调,通栏中拖动添加子模块
                drop: function (event, ui) {
                    //保存_this指向为根vm
                    var _this = avalon.vmodels.app

                    //找出拖拽后放置模块的通栏Id
                    var subVm = $(event.target).attr("wid")
                    var subVmAt = subVm.split("_")[1]

                    //接收容器VM,vm$model
                    var receiveTopVm, receiveVm, receiveVmModel, receiveTopVmModel
                    //如果模块拖入的通栏为顶部或者底部公共通栏
                    if (subVm == 'drag_header' || subVm == 'drag_footer') {
                        var key = subVm.split("_")[1]
                        receiveTopVm = avalon.vmodels["public" + key][key + "Layouts"]
                        receiveTopVmModel = avalon.vmodels["public" + key].$model[key + "Layouts"]
                        receiveVm = avalon.vmodels["public" + key][key + "Layouts"]
                        receiveVmModel = avalon.vmodels["public" + key].$model[key + "Layouts"]
                    } else {
                        //如果在app中的layouts数组中,把下标改为number类型
                        subVmAt = Number(subVmAt)
                        receiveTopVm = avalon.vmodels.app.layouts
                        receiveTopVmModel = avalon.vmodels.app.$model.layouts
                        receiveVm = avalon.vmodels.app.layouts[subVmAt]
                        receiveVmModel = avalon.vmodels.app.$model.layouts[subVmAt]
                    }


                    //如果模块拖拽来源是左侧栏
                    if ($(ui.helper).attr("data-base") == "true") {
                        //创建一个接收模块数据空对象
                        var moduelBox = {}
                        //var geturl = cf.config.downloadUrl + $(ui.helper).attr("jsonname")
                        var geturl = "http://localhost:8090/src/jsons/" + $(ui.helper).attr("jsonname") + ".json"
                        //请求模块默认数据
                        $.when($.ajax({type: "GET",url: geturl,dataType: "json"})).then(function (data) {
                            moduelBox = data
                            //复制模块数据,给复制的模块添加唯一ID
                            moduelBox.moduleId = moduelBox.moduleName + "_" + new Date().getTime()
                            //设置拖入通栏后的位置
                            var t = event.pageY - $(event.target).position().top
                            var l = event.pageX - $(".bst-main-width").offset().left
                            moduelBox.moduleSet.outLook.styles.top = t
                            moduelBox.moduleSet.outLook.styles.left = l

                            //获取拖入模块的高度,拖入模块距离接收容器顶部的距离
                            var moduleHeight = moduelBox.moduleSet.outLook.styles.height + moduelBox.moduleSet.outLook.styles.marginTop + moduelBox.moduleSet.outLook.styles.marginBottom
                            var moduleTop = moduelBox.moduleSet.outLook.styles.top

                            //如果模块拖出来再通栏边界,则自动撑开通栏
                            if ((moduleHeight + moduleTop) > receiveVmModel) {
                                receiveVm.styles.height = moduleHeight + moduleTop + 10
                            }

                            //取出当前通栏下的所有模块数据
                            var old = T.Tools.isEmptyObject(receiveVm.slotModeules) ? {} : receiveVmModel.slotModeules
                            //把新加的模块添加到old对象上
                            old[moduelBox.moduleId] = moduelBox
                            //把新的数据给到通栏子模块集合
                            receiveVm.slotModeules = old
                        },function(xhr){
                            console.log(xhr)
                        })
                    } else {//如果是拖拽页面上的元素
                        //获取当前被拖动元素节点
                        var moveNow = $(ui.draggable)
                        //当前被拖动元素节点ID
                        var moveNowId = moveNow.attr("wid")
                        //当前元素节点父容器ID
                        var moveParentId = moveNow.parent().attr("wid").split("_")[1]
                        if (moveParentId !== 'header' && moveParentId !== 'footer') {
                            moveParentId = Number(moveParentId)
                        }
                        //获取偏移值
                        var l = Number(moveNow.css("left").replace("px", ""))
                        var t = Number(moveNow.css("top").replace("px", ""))
                        //如果没有拖出通栏
                        if (subVmAt == moveParentId) {
                            //如果移除边界,就强制设为贴边
                            if (t < 0) {
                                t = 0
                            } else if ((t + moveNow.outerHeight()) > moveNow.parent().height()) {
                                t = moveNow.parent().height() - moveNow.outerHeight()
                            }

                            //取到父容器的数据对象,把移动的位置同步到数据中去
                            receiveVm.slotModeules[moveNowId].moduleSet.outLook.styles.top = t
                            receiveVm.slotModeules[moveNowId].moduleSet.outLook.styles.left = l
                        } else {
                            //调整top值

                            //console.log($(event.target).position())
                            //console.log("left:"+event.pageX+"top:"+event.pageY)

                            t = event.pageY - $(event.target).position().top
                            l = event.pageX - $(event.target).position().left
                            //console.log(t)

                            //从原父对象中复制出数据
                            moveObj = avalon.vmodels[moveNow.parent().attr("wid")].slotModeules[moveNowId]
                            //删除原对象中数据
                            var oldMod
                            if (typeof moveParentId == 'number') {
                                oldMod = avalon.vmodels.app.$model.layouts[moveParentId].slotModeules
                                delete oldMod[moveNowId]
                                //如果对象为空了就设置成null
                                oldMod = T.Tools.isEmptyObject(oldMod) ? null : oldMod
                                avalon.vmodels.app.layouts[moveParentId].slotModeules = oldMod
                            } else {
                                oldMod = avalon.vmodels["public" + moveParentId].$model[moveParentId + "Layouts"].slotModeules
                                delete oldMod[moveNowId]
                                //如果对象为空了就设置成null
                                oldMod = T.Tools.isEmptyObject(oldMod) ? null : oldMod
                                avalon.vmodels["public" + moveParentId][moveParentId + "Layouts"].slotModeules = oldMod
                            }

                            //改变拖动后偏移值
                            moveObj.moduleSet.outLook.styles.top = t
                            moveObj.moduleSet.outLook.styles.left = l
                            //拖动时hover为true,手动改变状态
                            moveObj.flag = true


                            //加入新父对象中
                            var old = T.Tools.isEmptyObject(receiveVm.slotModeules) ? {} : receiveVmModel.slotModeules
                            old[moveNowId] = moveObj
                            receiveVm.slotModeules = old
                            //调整视图层top值
                            moveNow.css({"top":t,"left":l})
                        }
                    }
                }
            });

            //禁止拖动设置宽度
            $(this.$element).children(".ui-resizable-e").remove()
            $(this.$element).children(".ui-resizable-se").remove()
        },
        //删除通栏
        removeDrag: function () {
            var index = Number($(this.$element).attr("wid").split("_")[1])
            avalon.vmodels.app.layouts.removeAt(index)
            console.log(avalon.vmodels.app.layouts.$model)
        },
        //通栏上移
        moveTop: function () {
            var index = Number($(this.$element).attr("wid").split("_")[1])
            var arr = avalon.vmodels.app.layouts.$model
            if (index == 0) {
                alert("眼瞎了吗!没看到到顶了?!")
            } else {
                arr[index - 1] = avalon.vmodels.app.layouts.$model[index]
                arr[index] = avalon.vmodels.app.layouts.$model[index - 1]
                avalon.vmodels.app.layouts = arr
            }
        },
        //通栏下移
        moveBottom: function () {
            var index = Number($(this.$element).attr("wid").split("_")[1])
            var arr = avalon.vmodels.app.layouts.$model
            if (index == arr.length - 1) {
                alert("到底了,傻逼?!")
            } else {
                arr[index + 1] = avalon.vmodels.app.layouts.$model[index]
                arr[index] = avalon.vmodels.app.layouts.$model[index + 1]
                avalon.vmodels.app.layouts = arr
            }
        },
        moduleId: "",
        moduleName: 'drag',
        styles: {
            height: 300,
            width: "100%"
        },
        slotModeules: null
    }
})



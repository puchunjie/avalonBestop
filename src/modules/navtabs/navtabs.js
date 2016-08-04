/**
 * Created by puchunjie on 16/7/6.
 */
var avalon = require("avalon")

avalon.component('ms-navtabs', {
    template: require('text!./navtabs.html'),
    defaults: {
        onReady: function () {
            $(".attribute-wrap").on("click",".radio-box", function () {
                //如果是自定义,显示自定义面板
                if($(this).val() == 'custom'){
                    $(this).siblings(".attribute-custom").show()
                }else{
                    hiddenCustom($(this))
                }
            })
        },
        checkbox1:function (obj,e,name,o) {
            if($(e.target).is(":checked")){
              obj[name] = $(e.target).val()
            }else{
              obj[name] = o
            }
        },
        checkedF:function (obj,e) {
            if($(e.target).siblings(".attribute-custom").find("input:eq(0)").val()==obj.fontWeight){
              $(e.target).siblings(".attribute-custom").find("input:eq(0)").attr("checked",true);
            }else{
              $(e.target).siblings(".attribute-custom").find("input:eq(0)").attr("checked",false);
            }
            if($(e.target).siblings(".attribute-custom").find("input:eq(1)").val()==obj.fontStyle){
              $(e.target).siblings(".attribute-custom").find("input:eq(1)").attr("checked",true);
            }else{
              $(e.target).siblings(".attribute-custom").find("input:eq(1)").attr("checked",false);
            }
            if($(e.target).siblings(".attribute-custom").find("input:eq(2)").val()==obj.textDecoration){
              $(e.target).siblings(".attribute-custom").find("input:eq(2)").attr("checked",true);
            }else{
              $(e.target).siblings(".attribute-custom").find("input:eq(2)").attr("checked",false);
            }
        },
        showPanel:function(target){
            $(".attribute-wrap > div").fadeOut(300)
            $('.'+target).fadeIn(300)
        },
        setDefault: function (val,oldVal,key) {
            //批量恢复默认属性
           for(var i=0;i<val.length;i++){
               val[i][key[i]] = oldVal[i]
           }
           //avalon.scan(avalon.vmodels.navPanel.settingObj= avalon.vmodels.app.layouts[avalon.vmodels.navPanel.layoutKey].slotModeules[avalon.vmodels.navPanel.slotModeulesKey].$model)
           //avalon.vmodels.navPanel.settingObj= avalon.vmodels.app.layouts[avalon.vmodels.navPanel.layoutKey].slotModeules[avalon.vmodels.navPanel.slotModeulesKey].$model
        },
        // dxfont:function(a){
        //             console.log(a)
        //             a.flag = !a.flag
        //             // console.log("qqqqq")
        // },
        addnavshow:function(e){
             $(".add-nav").hide()
             var t = e.target;
             $(t).siblings("ul").children("li.add-nav").show()
    
        },
        updatelick:function(){
              avalon.vmodels.app.layouts[avalon.vmodels.navPanel.layoutKey].slotModeules[avalon.vmodels.navPanel.slotModeulesKey] = avalon.vmodels.navPanel.$model.settingObj
              avalon.vmodels[avalon.vmodels.navPanel.slotModeulesKey] = avalon.vmodels.navPanel.$model.settingObj
        },
        addDataclick:function(){
              var tt="nav"+new Date().getTime();
              var old = avalon.vmodels.navPanel.settingObj.moduleSet.navData.$model;
              avalon.vmodels.navPanel.settingObj.moduleSet.addData.cid = new Date().getTime();
              old[tt] = avalon.vmodels.navPanel.settingObj.moduleSet.addData.$model;



              avalon.vmodels.navPanel.settingObj.moduleSet.navData =old;

              avalon.vmodels.navPanel.settingObj.moduleSet.addData.name = "";
              avalon.vmodels.navPanel.settingObj.moduleSet.addData.ename = "";
              avalon.vmodels.navPanel.settingObj.moduleSet.addData.url = "";

              avalon.vmodels.app.layouts[avalon.vmodels.navPanel.layoutKey].slotModeules[avalon.vmodels.navPanel.slotModeulesKey] = avalon.vmodels.navPanel.$model.settingObj
              avalon.vmodels[avalon.vmodels.navPanel.slotModeulesKey] = avalon.vmodels.navPanel.$model.settingObj
        },
        delDataclick:function(a){
                var navdata = avalon.vmodels.navPanel.settingObj.moduleSet.navData.$model;
                delete navdata[a];
                avalon.vmodels.navPanel.settingObj.moduleSet.navData = navdata


                avalon.vmodels.app.layouts[avalon.vmodels.navPanel.layoutKey].slotModeules[avalon.vmodels.navPanel.slotModeulesKey] = avalon.vmodels.navPanel.$model.settingObj
                avalon.vmodels[avalon.vmodels.navPanel.slotModeulesKey] = avalon.vmodels.navPanel.$model.settingObj
              //console.log(avalon.vmodels.navPanel.settingObj.moduleSet.navData)
        },
        add2Dataclick:function(a){
              
              var tt="nav"+new Date().getTime();
              var old = avalon.vmodels.navPanel.settingObj.moduleSet.navData.$model;
              avalon.vmodels.navPanel.settingObj.moduleSet.addData.cid = new Date().getTime();
              avalon.vmodels.navPanel.settingObj.moduleSet.addData.cj = "2";
              avalon.vmodels.navPanel.settingObj.moduleSet.addData.pid = a ;
              //alert(avalon.vmodels.navPanel.settingObj.moduleSet.addData.pid)
              old[tt] = avalon.vmodels.navPanel.settingObj.moduleSet.addData.$model;

              avalon.vmodels.navPanel.settingObj.moduleSet.navData =old;

              avalon.vmodels.navPanel.settingObj.moduleSet.addData.name = "";
              avalon.vmodels.navPanel.settingObj.moduleSet.addData.ename = "";
              avalon.vmodels.navPanel.settingObj.moduleSet.addData.url = "";

              avalon.vmodels.app.layouts[avalon.vmodels.navPanel.layoutKey].slotModeules[avalon.vmodels.navPanel.slotModeulesKey] = avalon.vmodels.navPanel.$model.settingObj
              avalon.vmodels[avalon.vmodels.navPanel.slotModeulesKey] = avalon.vmodels.navPanel.$model.settingObj
        },
        add3Dataclick:function(a){
              
              var tt="nav"+new Date().getTime();
              var old = avalon.vmodels.navPanel.settingObj.moduleSet.navData.$model;
              avalon.vmodels.navPanel.settingObj.moduleSet.addData.cid = new Date().getTime();
              avalon.vmodels.navPanel.settingObj.moduleSet.addData.cj = "3";
              avalon.vmodels.navPanel.settingObj.moduleSet.addData.pid = a ;
              //alert(avalon.vmodels.navPanel.settingObj.moduleSet.addData.pid)
              old[tt] = avalon.vmodels.navPanel.settingObj.moduleSet.addData.$model;

              avalon.vmodels.navPanel.settingObj.moduleSet.navData =old;

              avalon.vmodels.navPanel.settingObj.moduleSet.addData.name = "";
              avalon.vmodels.navPanel.settingObj.moduleSet.addData.ename = "";
              avalon.vmodels.navPanel.settingObj.moduleSet.addData.url = "";
              
              avalon.vmodels.app.layouts[avalon.vmodels.navPanel.layoutKey].slotModeules[avalon.vmodels.navPanel.slotModeulesKey] = avalon.vmodels.navPanel.$model.settingObj
              avalon.vmodels[avalon.vmodels.navPanel.slotModeulesKey] = avalon.vmodels.navPanel.$model.settingObj
        }
    }
})


function hiddenCustom(item){
    if(!$(item).siblings(".attribute-custom").is(":hidden")){
        $(item).siblings(".attribute-custom").hide()
    }
}
// function checkbox1(){
//    // if($('.cbjc').is(':checked')) {
//         alert("1111")
// //    }
// }

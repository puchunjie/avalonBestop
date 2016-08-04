/**
 * Created by xukai on 16/6/30.
 */
var avalon = require('avalon')
var modInit = require('moduleInit')
require('text!./style.css')



avalon.component('ms-menu', {
    template: require('text!./menubase.html'),
    defaults: {
            	onReady: function () {
                    modInit.moduleInit(this)
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





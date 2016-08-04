/**
 * Created by puchunjie on 16/7/6.
 */
var avalon = require("avalon")
require('text!./tabs.css')

avalon.component('ms-tabs', {
    template: require('text!./tabs.html'),
    defaults: {
        tabs: [
            {
                name: '选项一',
                component: '1'
            },
            {
                name: '选项2',
                component: '2'
            },
            {
                name: '选项三',
                component: '3'
            }
        ],
        tpl: '',
        currentTab: 0,
        onChangeTab: function (index) {
            this.currentTab = index;
            this.tpl = '<p>' + this.tabs[index].component + '</p>';
        },
        onInit: function () {
            var index = this.currentTab;
            this.onChangeTab(index);
        }
    }
})
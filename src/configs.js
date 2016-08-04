/**
 * Created by puchunjie on 16/8/4.
 */
exports.config = {
    avalonInit: function () {
        //avalon配置
        avalon.config({
            debug: false
        })
    },
    //域名配置
    uploadUrl: 'http://192.168.40.87:8088/site/Model/accept',
    downloadUrl: 'http://192.168.40.87:8088/site/Model/achieve/'
}
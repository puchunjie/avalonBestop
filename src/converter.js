/**
 * Created by puchunjie on 16/8/2.
 */
exports.converter = function(obj){
    var arr = [];
    for(var item in obj){
        arr.push(obj[item]);
    }
    obj = arr
    console.log(obj)
}

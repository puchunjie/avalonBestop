/**
 * Created by puchunjie on 16/8/4.
 * 颜色拾取器初始化
 */

exports.colorPickerInit = function(_this){
    $(".color-pick").minicolors({
        control: $(this).attr('data-control') || 'hue',
        defaultValue: $(this).attr('data-defaultValue') || '',
        inline: $(this).attr('data-inline') === 'true',
        letterCase: $(this).attr('data-letterCase') || 'lowercase',
        opacity: $(this).attr('data-opacity'),
        position: $(this).attr('data-position') || 'bottom left',
        changeDelay:100,
        change: function(hex, opacity) {
            var log;
            try {
                log = hex ? hex : 'transparent';
                if( opacity ) log += ', ' + opacity;
                var key = $(this).attr("valName").split(".")
                _this[key[0]][key[1]][key[2]][key[3]] = log

            } catch(e) {}
        },
        theme: 'default'
    });
}

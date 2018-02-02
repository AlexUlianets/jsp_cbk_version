//CALENDAR

function getCookie(name) {

    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}
$(function () {
    if ($('#calendar').length) {
        if(!$.datepicker.initialized) {
            $.datepicker._updateDatepicker_original = $.datepicker._updateDatepicker;
        }
        $.datepicker._updateDatepicker = function (inst) {
            $.datepicker._updateDatepicker_original(inst);
            var afterShow = this._get(inst, 'afterShow');
            if (afterShow)
                afterShow.apply((inst.input ? inst.input[0] : null));  // trigger custom callback
        };
        var lang = getCookie("langCookieCode");
        var monthNamesShort = [];
        var dayNamesMin = [];
        if(lang == 'ru'){
            monthNamesShort = ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"];
            dayNamesMin = ["По","Вт","Ср","Че","Пя","Су","Во"];
        }else if(lang == 'by'){
            monthNamesShort = ["Сту","Лют","Сак","Кра","Май","Чэр","Ліп","Жні","Вер","Кас","Ліс","Сне"];
            dayNamesMin = ["Па","Аў","Се","Ча","Пя","Су","Ня"];
        }else if(lang == 'de'){
            monthNamesShort = ["Jan","Feb","Mär", "Apr","Mai","JUN","JUL","AUG","SEP","OKT","NOV","DEZ"];
            dayNamesMin = ["Mo","Di","Mi","Do","Fr","Sa","So"];
        }else if(lang == "fr"){
            monthNamesShort = ["jan","fév","mar","avr","mai","jun","jul","aoû","sep","oct","nov","déc"];
            dayNamesMin = ["lu","ma","me","je","ve","sa","di"];
        }else if(lang == 'it'){
            monthNamesShort = ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"];
            dayNamesMin = ["Lu","Ma","Me","Gi","Ve","Sa","Do"];
        }else if (lang == 'en'){
            monthNamesShort = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
            dayNamesMin = ["Mo","Tu","We","Th","Fr","Sa","Su"];
        }else if (lang == 'ua'){
            monthNamesShort = ["СІЧ","ЛЮТ","БЕР","КВІ","ТРА","ЧЕР","ЛИП","СЕР","ВЕР","ЖОВ","ЛИС","ГРУ"];
            dayNamesMin = ["По","Ві","Се","Че","П'я","Су","Не"];
        }

        $('#calendar').datepicker({
            monthNamesShort: monthNamesShort,
            dayNamesMin: dayNamesMin,
            inline: true,
            showOtherMonths: true,
            selectOtherMonths: true,
            changeMonth: true,
            changeYear: true,
            maxDate: new Date(new Date().getTime() + 13 * 24 * 60 *60 * 1000), //disabling date for 14 + days
            minDate: new Date("2008-07-01"),
            afterShow: function () {
                $(".ui-datepicker select").styler();

            },
            onSelect: function () {
                var scope = angular.element("[ng-controller=past-weatherCtrl]").scope();
                var selectedDate = $(this).datepicker('getDate');
                var year = selectedDate.getFullYear();
                var day = parseInt(selectedDate.getDate())<10?'0'+ selectedDate.getDate():selectedDate.getDate();
                var month = parseInt(selectedDate.getMonth()) + 1<10?'0'+ (parseInt(selectedDate.getMonth())+1):parseInt(selectedDate.getMonth()) + 1;

                scope.showWeatherForDate( year + "-" + month  + "-" + day);
                $('#dp-calendar').removeClass('visible-calendar');
            }
        });


        /*
         ** visible calendar
         */
        $("#calendar").click(function (e) {
            e.stopPropagation();
        });

        $('#dp-calendar .calendar-activator').on('click', function (e) {
            $('#dp-calendar').addClass('visible-calendar');
        });
        $('html,body').click(function (e) {
            //e.stopPropagation();

            if (!$(e.target).is(".calendar-activator") && !$(e.target).parents(".ui-datepicker").length && !$(e.target).is(".calendar-activator .img ") && !$(e.target).is(".calendar-activator span#pickADate") ) {
                $('#dp-calendar').removeClass('visible-calendar');
            }
        });
        $('.close-calendar').click(function (e) {
            //e.stopPropagation();

            if (!$(e.target).is(".calendar-activator") && !$(e.target).parents(".ui-datepicker").length) {
                $('#dp-calendar').removeClass('visible-calendar');
            }
        });
    }
});

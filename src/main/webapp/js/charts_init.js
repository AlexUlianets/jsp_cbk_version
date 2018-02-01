function readyGet(response, responseYear, type, page, graphTitle, timeRange, year_title) {

    $(document).ready(function () {
        Highcharts.createElement('link', {
            rel: 'stylesheet',
            type: 'text/css'
        }, null, document.getElementsByTagName('head')[0]);
        Highcharts.theme = {
            colors: ["#fff5ae", "#46febe", "#14F7E9", "#F4979C", "#fff", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
            chart: {
                backgroundColor: '#009ad0',
                style: {fontFamily: "'Unica One', sans-serif"},
                plotBorderColor: '#606063'
            },
            title: {style: {color: '#fff', textTransform: 'uppercase', fontSize: '16px'}},
            xAxis: {
                tickInterval: 0.5,
                gridLineWidth: 1,
                tickLength: 0,
                gridLineColor: '#43cfff',
                labels: {style: {color: '#fff'}},
                lineColor: '#43cfff',
                minorGridLineColor: '#505053',
                tickColor: 'rgba(0,0,0,0)',
                title: {style: {color: '#A0A0A3'}}
            },
            yAxis: {
                tickInterval: 2,
                gridLineColor: '#43cfff',
                labels: {style: {color: '#E0E0E3'}},
                lineColor: '#43cfff',
                minorGridLineColor: '#505053',
                tickColor: 'rgba(0,0,0,0)',
                tickWidth: 1,
                title: {style: {color: '#A0A0A3'}}
            },
            tooltip: {backgroundColor: '#fff', style: {color: '#000', padding: '10px', fontSize: '15'}},
            plotOptions: {
                series: {
                    animation: {duration: 4000},
                    dataLabels: {color: '#B0B0B3'},
                    states: {hover: {color: '#3ddfa7'}},
                    marker: {lineColor: '#333', radius: 4, states: {hover: {fillColor: '#fff5ae', radius: 4,}}},
                }, boxplot: {fillColor: '#505053'}, candlestick: {lineColor: 'white'}, errorbar: {color: 'white'}
            },
            legend: {
                itemStyle: {color: '#E0E0E3'},
                itemHoverStyle: {color: '#FFF'},
                itemHiddenStyle: {color: '#606063'}
            },
            credits: {style: {color: '#666'}},
            labels: {style: {color: '#707073'}},
            navigation: false,
        };
        Highcharts.setOptions(Highcharts.theme);
    });
    !function (e, n, t) {
        function o(e, n) {
            return typeof e === n
        }

        function a() {
            var e, n, t, a, s, i, r;
            for (var l in d) if (d.hasOwnProperty(l)) {
                if (e = [], n = d[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
                for (a = o(n.fn, "function") ? n.fn() : n.fn, s = 0; s < e.length; s++) i = e[s], r = i.split("."), 1 === r.length ? Modernizr[r[0]] = a : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = a), f.push((a ? "" : "no-") + r.join("-"))
            }
        }

        function s(e) {
            var n = u.className, t = Modernizr._config.classPrefix || "";
            if (p && (n = n.baseVal), Modernizr._config.enableJSClass) {
                var o = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
                n = n.replace(o, "$1" + t + "js$2")
            }
            Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), p ? u.className.baseVal = n : u.className = n)
        }

        function i() {
            return "function" != typeof n.createElement ? n.createElement(arguments[0]) : p ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments)
        }

        function r() {
            var e = n.body;
            return e || (e = i(p ? "svg" : "body"), e.fake = !0), e
        }

        function l(e, t, o, a) {
            var s, l, f, d, c = "modernizr", p = i("div"), m = r();
            if (parseInt(o, 10)) for (; o--;) f = i("div"), f.id = a ? a[o] : c + (o + 1), p.appendChild(f);
            return s = i("style"), s.type = "text/css", s.id = "s" + c, (m.fake ? m : p).appendChild(s), m.appendChild(p), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(n.createTextNode(e)), p.id = c, m.fake && (m.style.background = "", m.style.overflow = "hidden", d = u.style.overflow, u.style.overflow = "hidden", u.appendChild(m)), l = t(p, e), m.fake ? (m.parentNode.removeChild(m), u.style.overflow = d, u.offsetHeight) : p.parentNode.removeChild(p), !!l
        }

        var f = [], d = [], c = {
            _version: "3.3.1",
            _config: {classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0},
            _q: [],
            on: function (e, n) {
                var t = this;
                setTimeout(function () {
                    n(t[e])
                }, 0)
            },
            addTest: function (e, n, t) {
                d.push({name: e, fn: n, options: t})
            },
            addAsyncTest: function (e) {
                d.push({name: null, fn: e})
            }
        }, Modernizr = function () {
        };
        Modernizr.prototype = c, Modernizr = new Modernizr;
        var u = n.documentElement, p = "svg" === u.nodeName.toLowerCase(), m = function () {
            var n = e.matchMedia || e.msMatchMedia;
            return n ? function (e) {
                var t = n(e);
                return t && t.matches || !1
            } : function (n) {
                var t = !1;
                return l("@media " + n + " { #modernizr { position: absolute; } }", function (n) {
                    t = "absolute" == (e.getComputedStyle ? e.getComputedStyle(n, null) : n.currentStyle).position
                }), t
            }
        }();
        c.mq = m, a(), s(f), delete c.addTest, delete c.addAsyncTest;
        for (var h = 0; h < Modernizr._q.length; h++) Modernizr._q[h]();
        e.Modernizr = Modernizr
    }(window, document);
    var tempArray = []
    var tempMinDateYearArray = []
    var tempMaxDateYearArray = []
    var precipArray = []
    var precipDateYearArray = []
    var weatherIcons = []
    var val_zn = type === 'C' ? 'mm' : 'inch';
    if (page === 'outlook' || page === 'today' || page === 'ten-days' || page === 'seven-days' || page === 'fourteen-days') {
        var dateStart = response.data[0].date
        var temp = response.data;
        var tempYear = responseYear.data;
        temp.forEach(function (temp) {
            type === 'C' ? tempArray.push(parseInt(temp.tempC)) : tempArray.push(parseInt(temp.tempF))
            type === 'C' ? precipArray.push(parseFloat(temp.precipMM)) : precipArray.push(parseFloat(temp.precipInch))
            weatherIcons.push(temp.weatherIcon)
        });
    } else if (page === 'hour-by-hour') {
        var temp = response;
        weatherIcons = [];
        tempArray = [];
        precipArray = [];
        temp.forEach(function (temp) {
            type === 'C' ? tempArray.push(parseInt(temp.tempC)) : tempArray.push(parseInt(temp.tempF))
            type === 'C' ? precipArray.push(parseFloat(temp.precipMM)) : precipArray.push(parseFloat(temp.precipInch))
            temp.isDay === false ? weatherIcons.push(temp.weatherCode + "_night") : weatherIcons.push(temp.weatherCode + "_day")
        });
    } else if (page === 'three-days') {
        var temp = response;
        var dateStart = temp
    } else if (page === 'five-days') {
        var temp = response;
    }
    var tempYear = responseYear.data;

    if (tempYear != undefined) {
        console.log(tempYear)
        tempYear.forEach(function (tempYear) {
            type === 'C' ? tempMinDateYearArray.push(parseFloat(tempYear.mintempC)) : tempMinDateYearArray.push(parseFloat(tempYear.mintempF))
            type === 'C' ? tempMaxDateYearArray.push(parseFloat(tempYear.maxtempC)) : tempMaxDateYearArray.push(parseFloat(tempYear.maxtempF))
            type === 'C' ? precipDateYearArray.push(parseFloat(tempYear.precipMM)) : precipDateYearArray.push(parseFloat(tempYear.precipInch))
        });
    }
    var weatherJson = '{"t":13.773332595825195,"f":[{"mat":15,"uv":2,"d":"' + dateStart + '","h":[{"cc":100,"cop":99,"f":false,"wse":"LightRain","h":94,"hr":0,"wd":222,"flt":7,"p":1014,"wg":21,"t":9,"wsp":14,"v":7},{"cc":100,"cop":64,"f":false,"wse":"Overcast","h":95,"hr":6,"wd":272,"flt":8,"p":1012,"wg":28,"t":10,"wsp":15,"v":10},{"cc":93,"cop":69,"f":false,"wse":"ModeratePatchyRain","h":84,"hr":12,"wd":290,"flt":13,"p":1013,"wg":19,"t":14,"wsp":17,"v":10},{"cc":74,"cop":3,"f":false,"wse":"Fog","h":91,"hr":18,"wd":246,"flt":13,"p":1014,"wg":15,"t":14,"wsp":12,"v":7}],"mit":12,"dm":{"cc":92,"p":1013,"wg":18,"t":15,"wsp":18,"cop":100,"f":false,"v":10,"wse":"ModeratePatchyRain","h":79,"wd":287,"flt":15}},{"mat":20,"uv":2,"d":"2016-09-30","h":[{"cc":91,"cop":77,"f":false,"wse":"LightPatchyRain","h":93,"hr":0,"wd":213,"flt":10,"p":1012,"wg":28,"t":12,"wsp":16,"v":8},{"cc":64,"cop":0,"f":false,"wse":"Cloudy","h":95,"hr":6,"wd":229,"flt":12,"p":1010,"wg":27,"t":13,"wsp":18,"v":10},{"cc":68,"cop":1,"f":false,"wse":"Overcast","h":72,"hr":12,"wd":244,"flt":19,"p":1010,"wg":22,"t":19,"wsp":19,"v":10},{"cc":91,"cop":77,"f":false,"wse":"LightRain","h":89,"hr":18,"wd":265,"flt":17,"p":1012,"wg":17,"t":17,"wsp":13,"v":10}],"mit":12,"dm":{"cc":100,"p":1011,"wg":23,"t":20,"wsp":20,"cop":95,"f":false,"v":10,"wse":"Overcast","h":69,"wd":249,"flt":20}},{"mat":19,"uv":3,"d":"2016-10-01","h":[{"cc":100,"cop":0,"f":false,"wse":"Fog","h":98,"hr":0,"wd":228,"flt":11,"p":1013,"wg":17,"t":12,"wsp":8,"v":0},{"cc":73,"cop":89,"f":false,"wse":"ModeratePatchyRain","h":97,"hr":6,"wd":252,"flt":12,"p":1012,"wg":12,"t":13,"wsp":7,"v":9},{"cc":17,"cop":0,"f":false,"wse":"Mist","h":96,"hr":12,"wd":124,"flt":1,"p":1030,"wg":17,"t":3,"wsp":9,"v":2},{"cc":100,"cop":0,"f":false,"wse":"Fog","h":97,"hr":18,"wd":144,"flt":2,"p":1021,"wg":20,"t":5,"wsp":12,"v":0}],"mit":7,"dm":{"cc":23,"p":1015,"wg":10,"t":19,"wsp":9,"cop":98,"f":false,"v":10,"wse":"Clear","h":63,"wd":273,"flt":19}},{"mat":21,"uv":2,"d":"2016-10-02","h":[{"cc":50,"cop":0,"f":false,"wse":"Overcast","h":87,"hr":0,"wd":123,"flt":8,"p":1016,"wg":18,"t":8,"wsp":8,"v":10},{"cc":54,"cop":74,"f":false,"wse":"LightRain","h":95,"hr":6,"wd":135,"flt":10,"p":1015,"wg":19,"t":11,"wsp":11,"v":9},{"cc":11,"cop":2,"f":false,"wse":"Clear","h":74,"hr":12,"wd":173,"flt":19,"p":1014,"wg":16,"t":19,"wsp":14,"v":10},{"cc":26,"cop":6,"f":false,"wse":"PartlyCloudy","h":75,"hr":18,"wd":170,"flt":17,"p":1014,"wg":16,"t":17,"wsp":9,"v":10}],"mit":11,"dm":{"cc":9,"p":1014,"wg":16,"t":21,"wsp":14,"cop":76,"f":false,"v":10,"wse":"Clear","h":62,"wd":194,"flt":21}},{"mat":16,"uv":1,"d":"2016-10-03","h":[{"cc":37,"cop":1,"f":false,"wse":"PartlyCloudy","h":86,"hr":0,"wd":213,"flt":12,"p":1015,"wg":12,"t":12,"wsp":6,"v":10},{"cc":60,"cop":52,"f":false,"wse":"LightRain","h":92,"hr":6,"wd":330,"flt":11,"p":1015,"wg":13,"t":11,"wsp":6,"v":10},{"cc":83,"cop":58,"f":false,"wse":"ModeratePatchyRain","h":83,"hr":12,"wd":344,"flt":16,"p":1016,"wg":13,"t":16,"wsp":11,"v":5},{"cc":100,"cop":74,"f":false,"wse":"ModerateRain","h":92,"hr":18,"wd":338,"flt":13,"p":1016,"wg":10,"t":13,"wsp":7,"v":4}],"mit":10,"dm":{"cc":66,"p":1016,"wg":14,"t":16,"wsp":14,"cop":96,"f":false,"v":10,"wse":"ModeratePatchyRain","h":76,"wd":356,"flt":16}},{"mat":13,"uv":-999,"d":"2016-10-04","h":[{"cc":100,"cop":69,"f":false,"wse":"LightRain","h":96,"hr":0,"wd":328,"flt":9,"p":1016,"wg":21,"t":11,"wsp":14,"v":8},{"cc":100,"cop":17,"f":false,"wse":"ModeratePatchyRain","h":95,"hr":6,"wd":332,"flt":8,"p":1016,"wg":23,"t":10,"wsp":15,"v":10},{"cc":100,"cop":100,"f":false,"wse":"LightPatchyRain","h":91,"hr":12,"wd":331,"flt":10,"p":1017,"wg":21,"t":10,"wsp":18,"v":7},{"cc":100,"cop":70,"f":false,"wse":"LightPatchyRain","h":97,"hr":18,"wd":226,"flt":11,"p":1017,"wg":13,"t":12,"wsp":11,"v":8}],"mit":5,"dm":{"cc":100,"p":1016,"wg":20,"t":13,"wsp":18,"cop":100,"f":false,"v":2,"wse":"LightPatchyRain","h":91,"wd":334,"flt":11}},{"mat":8,"uv":-999,"d":"2016-10-05","h":[{"cc":90,"cop":69,"f":false,"wse":"LightPatchyRain","h":98,"hr":0,"wd":67,"flt":5,"p":1018,"wg":18,"t":7,"wsp":15,"v":7},{"cc":100,"cop":100,"f":false,"wse":"LightPatchyRain","h":96,"hr":6,"wd":61,"flt":3,"p":1021,"wg":20,"t":5,"wsp":17,"v":10},{"cc":99,"cop":18,"f":false,"wse":"ModeratePatchyRain","h":89,"hr":12,"wd":49,"flt":6,"p":1023,"wg":19,"t":8,"wsp":16,"v":10},{"cc":100,"cop":33,"f":false,"wse":"LightRain","h":91,"hr":18,"wd":40,"flt":8,"p":1025,"wg":20,"t":8,"wsp":18,"v":7}],"mit":4,"dm":{"cc":97,"p":1024,"wg":20,"t":8,"wsp":19,"cop":100,"f":false,"v":10,"wse":"ModeratePatchyRain","h":86,"wd":46,"flt":9}}],"y":"-1.1,-6.1,40.7;-0.4,-6.5,42.9;4.6,-3.5,46.3;12.5,2.2,50.3;18.3,6.8,63.3;21.9,10.8,62.1;24.0,13.2,81.5;23.1,12.1,69.1;16.9,7.4,48.9;10.2,3.1,47.2;2.8,-2.0,44.9;-1.1,-5.8,42.7","cn":{"cc":0,"p":1012,"wg":19,"t":17,"wsp":19,"cop":0,"f":false,"v":10,"wse":"PartlyCloudy","h":63,"wd":300,"flt":17}}',
        categoriesDate = ['NIGHT', 'MORN.', 'DAY', 'EVEN.', ' ', 'NIGHT', 'MORN.', 'DAY', 'EVEN.', ' ', 'NIGHT', 'MORN.', 'DAY', 'EVEN.', ' ', 'NIGHT', 'MORN.', 'DAY', 'EVEN.', ' ', 'NIGHT', 'MORN.', 'DAY', 'EVEN.', ' ', 'NIGHT', 'MORN.', 'DAY', 'EVEN.', ' ', 'NIGHT', 'MORN.', 'DAY', 'EVEN.'],
        iconDetailed = weatherIcons, tempDateTen = tempArray.slice(0, 10), precipDateTen = precipArray.slice(0, 10),
        tempDateFourteen = tempArray, precipDateFourteen = precipArray, tempDateSeven = tempArray.slice(0, 7),
        precipDateSeven = precipArray.slice(0, 7), tempDetailed = tempArray, precipDetailed = precipArray,
        categoriesYear = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        categoriesDetailed = timeRange, tempMinDateYear = tempMinDateYearArray, tempMaxDateYear = tempMaxDateYearArray,
        precipDateYear = precipDateYearArray, dey = 1000 * 60 * 60 * 24, tempDateThree = [], deyDate = [],
        precipDateThree = [], tempDateFive = [], iconDateThree = [], iconDateFive = [], precipDateFive = [],
        categoriesDateTen = [], categoriesDateFourteen = [], categoriesDateSeven = [], precipDateThree = [],
        tempDateFive = [], iconDateThree = [], iconDateFive = [], precipDateFive = [], categoriesDateTen = [],
        categoriesDateFourteen = [], categoriesDateSeven = [];
    weatherJson = JSON.parse(weatherJson);
    colDate = weatherJson['f'];
    deyDFirst = Date.parse(colDate[0]['d']);
    for (var i = 0; i <= 13; i++) {
        newDeyDFirst = deyDFirst + (dey * i)
        theTitleDay = new Date(newDeyDFirst).toDateString();
        theTitleDay = theTitleDay.substr(0, theTitleDay.length - 4);
        str = theTitleDay.slice(8) + theTitleDay.slice(4, 7) + ', ' + theTitleDay.slice(0, 3);
        categoriesDateFourteen[i] = str.toUpperCase();
    }
    for (var i = 0; i <= 9; i++) {
        newDeyDFirst = deyDFirst + (dey * i)
        theTitleDay = new Date(newDeyDFirst).toDateString();
        theTitleDay = theTitleDay.substr(0, theTitleDay.length - 4);
        str = theTitleDay.slice(8) + theTitleDay.slice(4, 7) + ', ' + theTitleDay.slice(0, 3);
        categoriesDateTen[i] = str.toUpperCase();
    }
    for (var i = 0; i <= 6; i++) {
        newDeyDFirst = deyDFirst + (dey * i)
        theTitleDay = new Date(newDeyDFirst).toDateString();
        theTitleDay = theTitleDay.substr(0, theTitleDay.length - 4);
        str = theTitleDay.slice(8) + theTitleDay.slice(4, 7) + ', ' + theTitleDay.slice(0, 3);
        categoriesDateSeven[i] = str.toUpperCase();
    }
    var t = 0;
    if (page === 'five-days') {
        for (var i = 0; i <= 4; i++) {
            for (var j = 0; j <= 3; j++) {
                tempDateFive[t] = type === 'C' ? parseInt(temp[i][0][j]['tempC']) : parseInt(temp[i][0][j]['tempF']);
                precipDateFive[t] = type === 'C' ? parseFloat(temp[i][0][j]['precipMM']) : parseInt(temp[i][0][j]['precipInch']);
                var icon = j === 0 || j === 3 ? 'night' : 'day';
                $('#weatherFiveIcon .wrp-icon').append('<span class="icon"><img src="svg/wicons_svg_white/' + temp[i][0][j]['weatherCode'] + '_' + icon + '.svg"></span>');
                deyDate[t] = ' ';
                t++
            }
            str = temp[i][1]['dayOfMonth'] + " " + temp[i][1]['monthOfYear'] + ', ' + temp[i][1]['dayOfWeek'];
            deyDate[t - 2] = str.toUpperCase();
            if (i <= 3) {
                tempDateFive[t] = null;
                precipDateFive[t] = null;
                $('#weatherFiveIcon .wrp-icon').append('<span class="icon"> </span>');
                deyDate[t] = ' ';
            }
            t++;
        }
    }
    if (page === 'three-days') {
        for (var i = 0; i <= 2; i++) {
            for (var j = 0; j <= 3; j++) {
                tempDateThree[t] = type === 'C' ? parseInt(temp[i][0][j]['tempC']) : parseInt(temp[i][0][j]['tempF']);
                precipDateThree[t] = type === 'C' ? parseFloat(temp[i][0][j]['precipMM']) : parseInt(temp[i][0][j]['precipInch']);
                var icon = j === 0 || j === 3 ? 'night' : 'day';
                $('#weatherThreeIcon .wrp-icon').append('<span class="icon"><img src="svg/wicons_svg_white/' + temp[i][0][j]['weatherCode'] + '_' + icon + '.svg"></span>');
                deyDate[t] = ' ';
                t++
            }
            str = temp[i][1]['dayOfMonth'] + " " + temp[i][1]['monthOfYear'] + ', ' + temp[i][1]['dayOfWeek'];
            deyDate[t - 2] = str.toUpperCase();
            if (i <= 1 && page === 'three-days') {
                tempDateThree[t] = null;
                precipDateThree[t] = null;
                $('#weatherThreeIcon .wrp-icon').append('<span class="icon"> </span>');
                deyDate[t] = ' ';
            }
            t++;
        }
    }
    $('#weatherDetailedIcon .wrp-icon').html(' ')
    for (var i = 0; i <= 23; i++) {
        $('#weatherDetailedIcon .wrp-icon').append('<span class="icon"><img src="svg/wicons_svg_white/' + iconDetailed[i] + '.svg"></span>');
    }
    for (var i = 0; i <= 13; i++) {
        $('#weatherFourteenIcon .wrp-icon').append('<span class="icon"><img src="svg/wicons_svg_white/' + iconDetailed[i] + '.svg"></span>');
    }
    $('#weatherTenIcon .wrp-icon').html(' ')
    for (var i = 0; i <= 9; i++) {
        $('#weatherTenIcon .wrp-icon').append('<span class="icon"><img src="svg/wicons_svg_white/' + iconDetailed[i] + '.svg"></span>');
    }
    for (var i = 0; i <= 6; i++) {
        $('#weatherSevenIcon .wrp-icon').append('<span class="icon"><img src="svg/wicons_svg_white/' + iconDetailed[i] + '.svg"></span>');
    }
    tempDateThreeNumbers = [];
    tempDateThree.forEach(function (element) {
        if (typeof element === 'number') {
            tempDateThreeNumbers.push(element)
        }
    })
    tempDateFiveNumbers = [];
    tempDateFive.forEach(function (element) {
        if (typeof element === 'number') {
            tempDateFiveNumbers.push(element)
        }
    })
    minTempThree = Math.min(...tempDateThreeNumbers
)
    -4;
    minTempFive = Math.min(...tempDateFiveNumbers
)
    -4;
    minTempTen = Math.min(...tempDateTen
)
    -4;
    minTempFourteen = Math.min(...tempDateFourteen
)
    -4;
    minTempSeven = Math.min(...tempDateSeven
)
    -4;
    minTempYear = Math.min(...tempMinDateYear
)
    -4;
    minTempDetailed = Math.min(...tempDetailed
)
    -4;
    $(function () {
        var zoomVar = '';
        if ($(document).width() <= 700) {
            zoomVar = '';
        } else {
            zoomVar = 'xy';
        }
        if ($(document).width() <= 700) {
            $('#weatherThree').highcharts({
                chart: {zoomType: zoomVar, marginLeft: 17, marginRight: 17},
                title: {text: graphTitle},
                xAxis: [{
                    type: 'datetime',
                    categories: categoriesDate,
                    labels: {format: '{value}', style: {color: Highcharts.getOptions().colors[4], fontSize: 8}, y: 30}
                }, {
                    type: 'datetime',
                    linkedTo: 0,
                    opposite: true,
                    categories: deyDate,
                    labels: {align: 'right', rotation: 0, y: -10, x: 20, style: {textOverflow: 'none', whiteSpace: 'nowrap', fontSize: 9}},
                    hover: {fillColor: '#f00', radius: 4}
                }],
                yAxis: [
                    {

                        labels: {
                            format: '{value}',
                            style: {color: Highcharts.getOptions().colors[4], fontSize: 8},
                            x: -5,
                            y: 3
                        },
                        title: {
                            text: '°'+type,
                            align: 'high',
                            offset: 0,
                            rotation: 0,
                            x: -3,
                            y: 3,
                            style: {color: Highcharts.getOptions().colors[0], fontSize: 7, fontWeight: 700}
                        },
                        lineWidth: 1,
                        tickAmount: 6,
                        showLastLabel: false
                    }, {labels: {format: '{value} ', style: {color: Highcharts.getOptions().colors[4], fontSize: 7},
                        x: 5,
                        y: 3
                    },
                        title: {
                            text: val_zn,
                            align: 'high',
                            offset: 0,
                            rotation: 0,
                            x: 3,
                            y: 3,
                            style: {color: Highcharts.getOptions().colors[1], fontSize: 7, fontWeight: 700}
                        },

                        lineWidth: 1,
                        opposite: true,
                        tickAmount: 6,
                        showLastLabel: false
                    }],
                tooltip: {borderColor: '#fff', headerFormat: '', pointFormat: '{point.y}'},
                legend: false,
                series: [{
                    connectNulls: true,
                    name: 'TEMP.',
                    type: 'line',
                    marker: {lineWidth: 2, lineColor: '#fff6af', fillColor: '#fff6af'},
                    data: tempDateThree,
                    tooltip: {valueSuffix: '°' + type},
                    zIndex: 3
                }, {
                    name: 'PRICIP.',
                    type: 'column',
                    borderWidth: 0,
                    maxPointWidth: 10,
                    yAxis: 1,
                    data: precipDateThree,
                    tooltip: {valueSuffix: ' ' + val_zn},
                    zIndex: 2
                }, {
                    connectNulls: true,
                    name: false,
                    type: 'area',
                    threshold: minTempThree,
                    lineWidth: 0,
                    fillColor: {
                        linearGradient: {x1: 1, y1: 0, x2: 1, y2: 1},
                        stops: [[0, 'rgba(255,245,174,0.3)'], [1, 'rgba(255,245,174,0)']]
                    },
                    marker: {lineWidth: 0, lineColor: '#fff6af', fillColor: '#fff6af',},
                    data: tempDateThree,
                    tooltip: {valueSuffix: '°' + type},
                    zIndex: 1
                }]
            });

            $('#weatherFive').highcharts({
                chart: {zoomType: zoomVar, marginLeft: 17, marginRight: 17},
                title: {text: graphTitle},
                xAxis: [{
                    type: 'datetime',
                    categories: categoriesDate,
                    labels: {format: '{value}', style: {color: Highcharts.getOptions().colors[4], fontSize: 8}, y: 30}
                }, {
                    type: 'datetime',
                    linkedTo: 0,
                    opposite: true,
                    categories: deyDate,
                    crosshair: true,
                    labels: {align: 'right', rotation: 0, y: -10, x: 20, style: {textOverflow: 'none', whiteSpace: 'nowrap', fontSize: 9}}
                }],
                yAxis: [
                    {

                        labels: {
                            format: '{value}',
                            style: {color: Highcharts.getOptions().colors[4], fontSize: 8},
                            x: -5,
                            y: 3
                        },
                        title: {
                            text: '°'+type,
                            align: 'high',
                            offset: 0,
                            rotation: 0,
                            x: -3,
                            y: 3,
                            style: {color: Highcharts.getOptions().colors[0], fontSize: 7, fontWeight: 700}
                        },
                        lineWidth: 1,
                        tickAmount: 6,
                        showLastLabel: false
                    }, {labels: {format: '{value} ', style: {color: Highcharts.getOptions().colors[4], fontSize: 7},
                        x: 5,
                        y: 3
                    },
                        title: {
                            text: val_zn,
                            align: 'high',
                            offset: 0,
                            rotation: 0,
                            x: 3,
                            y: 3,
                            style: {color: Highcharts.getOptions().colors[1], fontSize: 7, fontWeight: 700}
                        },

                        lineWidth: 1,
                        opposite: true,
                        tickAmount: 6,
                        showLastLabel: false
                    }],
                tooltip: {borderColor: '#fff', headerFormat: '', pointFormat: '{point.y}'},
                legend: false,
                series: [{
                    connectNulls: true,
                    name: 'TEMP.',
                    type: 'line',
                    marker: {lineWidth: 2, lineColor: '#fff6af', fillColor: '#fff6af',},
                    data: tempDateFive,
                    tooltip: {valueSuffix: '°' + type},
                    zIndex: 3
                }, {
                    name: 'PRICIP.',
                    type: 'column',
                    borderWidth: 0,
                    maxPointWidth: 10,
                    yAxis: 1,
                    data: precipDateFive,
                    tooltip: {valueSuffix: ' ' + val_zn},
                    zIndex: 2
                }, {
                    connectNulls: true,
                    name: false,
                    type: 'area',
                    threshold: minTempFive,
                    lineWidth: 0,
                    fillColor: {
                        linearGradient: {x1: 1, y1: 0, x2: 1, y2: 1},
                        stops: [[0, 'rgba(255,245,174,0.3)'], [1, 'rgba(255,245,174,0)']]
                    },
                    marker: {lineWidth: 0, lineColor: '#fff6af', fillColor: '#fff6af',},
                    data: tempDateFive,
                    tooltip: {valueSuffix: '°' + type},
                    zIndex: 1
                }]
            });

        } else {
            $('#weatherThree').highcharts({
                chart: {zoomType: zoomVar, marginLeft: 60, marginRight: 60},
                title: {text: graphTitle},
                xAxis: [{
                    type: 'datetime',
                    categories: categoriesDate,
                    labels: {format: '{value}', style: {color: Highcharts.getOptions().colors[4], fontSize: 12}, y: 30}
                }, {
                    type: 'datetime',
                    linkedTo: 0,
                    opposite: true,
                    categories: deyDate,
                    labels: {align: 'right', y: -20, rotation: 0, style: {textOverflow: 'none'}},
                    hover: {fillColor: '#f00', radius: 4,}
                }],
                yAxis: [{
                    labels: {
                        format: '{value}°' + type,
                        style: {color: Highcharts.getOptions().colors[4], fontSize: 12},
                    },
                    title: {
                        text: 'TEMP.',
                        align: 'high',
                        offset: 0,
                        rotation: 0,
                        x: -10,
                        y: 10,
                        style: {color: Highcharts.getOptions().colors[0], fontSize: 12, fontWeight: 700}
                    },
                    lineWidth: 1,
                    tickAmount: 6,
                    showLastLabel: false
                }, {
                    title: {
                        text: 'PRICIP.',
                        align: 'high',
                        offset: 0,
                        rotation: 0,
                        x: 15,
                        y: 10,
                        style: {color: Highcharts.getOptions().colors[1], fontSize: 12, fontWeight: 700}
                    },
                    labels: {format: '{value} ' + val_zn, style: {color: Highcharts.getOptions().colors[4], fontSize: 12}},
                    lineWidth: 1,
                    opposite: true,
                    tickAmount: 6,
                    showLastLabel: false
                }],
                tooltip: {borderColor: '#fff', headerFormat: '', pointFormat: '{point.y}'},
                legend: false,
                series: [{
                    connectNulls: true,
                    name: 'TEMP.',
                    type: 'line',
                    marker: {lineWidth: 2, lineColor: '#fff6af', fillColor: '#018ac1'},
                    data: tempDateThree,
                    tooltip: {valueSuffix: '°' + type},
                    zIndex: 3
                }, {
                    name: 'PRICIP.',
                    type: 'column',
                    borderWidth: 0,
                    maxPointWidth: 10,
                    yAxis: 1,
                    data: precipDateThree,
                    tooltip: {valueSuffix: ' ' + val_zn},
                    zIndex: 2
                }, {
                    connectNulls: true,
                    name: false,
                    type: 'area',
                    threshold: minTempThree,
                    lineWidth: 0,
                    fillColor: {
                        linearGradient: {x1: 1, y1: 0, x2: 1, y2: 1},
                        stops: [[0, 'rgba(255,245,174,0.3)'], [1, 'rgba(255,245,174,0)']]
                    },
                    marker: {lineWidth: 0, lineColor: '#fff6af', fillColor: '#018ac1',},
                    data: tempDateThree,
                    tooltip: {valueSuffix: '°' + type},
                    zIndex: 1
                }]
            });
            $('#weatherFive').highcharts({
                chart: {zoomType: zoomVar, marginLeft: 60, marginRight: 60},
                title: {text: graphTitle},
                xAxis: [{
                    type: 'datetime',
                    categories: categoriesDate,
                    labels: {format: '{value}', style: {color: Highcharts.getOptions().colors[4], fontSize: 12}, y: 30}
                }, {
                    type: 'datetime',
                    linkedTo: 0,
                    opposite: true,
                    categories: deyDate,
                    crosshair: true,
                    labels: {align: 'right', rotation: 0, y: -20, style: {textOverflow: 'none', whiteSpace: 'nowrap'}}
                }],
                yAxis: [{
                    labels: {
                        format: '{value}°' + type,
                        style: {color: Highcharts.getOptions().colors[4], fontSize: 12}
                    },
                    title: {
                        text: 'TEMP.',
                        align: 'high',
                        offset: 0,
                        rotation: 0,
                        x: -10,
                        y: 10,
                        style: {color: Highcharts.getOptions().colors[0], fontSize: 12, fontWeight: 700}
                    },
                    lineWidth: 1,
                    tickAmount: 6,
                    showLastLabel: false
                }, {
                    title: {
                        text: 'PRICIP.',
                        align: 'high',
                        offset: 0,
                        rotation: 0,
                        x: 15,
                        y: 10,
                        style: {color: Highcharts.getOptions().colors[1], fontSize: 12, fontWeight: 700}
                    },
                    labels: {format: '{value} ' + val_zn, style: {color: Highcharts.getOptions().colors[4], fontSize: 12}},
                    lineWidth: 1,
                    opposite: true,
                    tickAmount: 6,
                    showLastLabel: false
                }],
                tooltip: {borderColor: '#fff', headerFormat: '', pointFormat: '{point.y}'},
                legend: false,
                series: [{
                    connectNulls: true,
                    name: 'TEMP.',
                    type: 'line',
                    marker: {lineWidth: 2, lineColor: '#fff6af', fillColor: '#018ac1',},
                    data: tempDateFive,
                    tooltip: {valueSuffix: '°' + type},
                    zIndex: 3
                }, {
                    name: 'PRICIP.',
                    type: 'column',
                    borderWidth: 0,
                    maxPointWidth: 10,
                    yAxis: 1,
                    data: precipDateFive,
                    tooltip: {valueSuffix: ' ' + val_zn},
                    zIndex: 2
                }, {
                    connectNulls: true,
                    name: false,
                    type: 'area',
                    threshold: minTempFive,
                    lineWidth: 0,
                    fillColor: {
                        linearGradient: {x1: 1, y1: 0, x2: 1, y2: 1},
                        stops: [[0, 'rgba(255,245,174,0.3)'], [1, 'rgba(255,245,174,0)']]
                    },
                    marker: {lineWidth: 0, lineColor: '#fff6af', fillColor: '#018ac1',},
                    data: tempDateFive,
                    tooltip: {valueSuffix: '°' + type},
                    zIndex: 1
                }]
            });
        }
        $('#weatherSeven').highcharts({
            chart: {zoomType: zoomVar, marginLeft: 60, marginRight: 60},
            title: {text: graphTitle},
            xAxis: [{
                type: 'datetime',
                categories: categoriesDateSeven,
                labels: {format: '{value}', style: {color: Highcharts.getOptions().colors[4], fontSize: 12}, y: 30}
            }],
            yAxis: [{
                labels: {
                    format: '{value}°' + type,
                    style: {color: Highcharts.getOptions().colors[4], fontSize: 12}
                },
                title: {
                    text: 'TEMP.',
                    align: 'high',
                    offset: 0,
                    rotation: 0,
                    x: -10,
                    y: 10,
                    style: {color: Highcharts.getOptions().colors[0], fontSize: 12, fontWeight: 700}
                },
                lineWidth: 1,
                tickAmount: 6,
                showLastLabel: false
            }, {
                title: {
                    text: 'PRICIP.',
                    align: 'high',
                    offset: 0,
                    rotation: 0,
                    x: 6,
                    y: 10,
                    style: {color: Highcharts.getOptions().colors[1], fontSize: 12, fontWeight: 700}
                },
                labels: {format: '{value} ' + val_zn, style: {color: Highcharts.getOptions().colors[4], fontSize: 12}},
                lineWidth: 1,
                opposite: true,
                tickAmount: 6,
                showLastLabel: false
            }],
            tooltip: {borderColor: '#fff', headerFormat: '', pointFormat: '{point.y}'},
            legend: false,
            series: [{
                connectNulls: true,
                name: 'TEMP.',
                type: 'line',
                lineWidth: 2,
                marker: {lineWidth: 2, lineColor: '#fff6af', fillColor: '#fff6af'},
                data: tempDateSeven,
                tooltip: {valueSuffix: '°' + type},
                zIndex: 3
            }, {
                name: 'PRICIP.',
                type: 'column',
                borderWidth: 0,
                maxPointWidth: 10,
                yAxis: 1,
                x: 10,
                data: precipDateSeven,
                tooltip: {valueSuffix: ' ' + val_zn},
                zIndex: 2
            }, {
                connectNulls: true,
                name: false,
                type: 'area',
                threshold: minTempSeven,
                lineWidth: 0,
                fillColor: {
                    linearGradient: {x1: 1, y1: 0, x2: 1, y2: 1},
                    stops: [[0, 'rgba(255,245,174,0.3)'], [1, 'rgba(255,245,174,0)']]
                },
                marker: {lineWidth: 0, lineColor: '#fff6af', fillColor: '#fff6af',},
                data: tempDateSeven,
                tooltip: {valueSuffix: '°' + type},
                zIndex: 1
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 700
                    },
                    chartOptions: {
                        chart: {zoomType: zoomVar, marginLeft: 50, marginRight: 50},
                        xAxis: [{
                            type: 'datetime',
                            categories: categoriesDateSeven,
                            labels: {format: '{value}', style: {color: Highcharts.getOptions().colors[4], fontSize: 8}, y: 30, x: 10}
                        }],
                    }
                }]
            }
        });
        $('#weatherFourteen').highcharts({
            chart: {zoomType: zoomVar, marginLeft: 60, marginRight: 60},
            title: {text: graphTitle},
            xAxis: [{
                type: 'datetime',
                categories: categoriesDateFourteen,
                labels: {format: '{value}', style: {color: Highcharts.getOptions().colors[4], fontSize: 12}, y: 30}
            }],
            yAxis: [{
                labels: {
                    format: '{value}°' + type,
                    style: {color: Highcharts.getOptions().colors[4], fontSize: 12}
                },
                title: {
                    text: 'TEMP.',
                    align: 'high',
                    offset: 0,
                    rotation: 0,
                    x: -10,
                    y: 10,
                    style: {color: Highcharts.getOptions().colors[0], fontSize: 12, fontWeight: 700}
                },
                lineWidth: 1,
                tickAmount: 6,
                showLastLabel: false
            }, {
                title: {
                    text: 'PRICIP.',
                    align: 'high',
                    offset: 0,
                    rotation: 0,
                    x: 8,
                    y: 10,
                    style: {color: Highcharts.getOptions().colors[1], fontSize: 12, fontWeight: 700}
                },
                labels: {format: '{value} ' + val_zn, style: {color: Highcharts.getOptions().colors[4], fontSize: 12}},
                lineWidth: 1,
                opposite: true,
                tickAmount: 6,
                showLastLabel: false
            }],
            tooltip: {borderColor: '#fff', headerFormat: '', pointFormat: '{point.y}'},
            legend: false,
            series: [{
                connectNulls: true,
                name: 'TEMP.',
                type: 'line',
                lineWidth: 2,
                marker: {lineWidth: 2, lineColor: '#fff6af', fillColor: '#fff6af'},
                data: tempDateFourteen,
                tooltip: {valueSuffix: '°' + type},
                zIndex: 3
            }, {
                name: 'PRICIP.',
                type: 'column',
                borderWidth: 0,
                maxPointWidth: 10,
                yAxis: 1,
                data: precipDateFourteen,
                tooltip: {valueSuffix: ' ' + val_zn},
                zIndex: 2
            }, {
                connectNulls: true,
                name: false,
                type: 'area',
                threshold: minTempFourteen,
                lineWidth: 0,
                fillColor: {
                    linearGradient: {x1: 1, y1: 0, x2: 1, y2: 1},
                    stops: [[0, 'rgba(255,245,174,0.3)'], [1, 'rgba(255,245,174,0)']]
                },
                marker: {lineWidth: 0, lineColor: '#fff6af', fillColor: '#fff6af',},
                data: tempDateFourteen,
                tooltip: {valueSuffix: '°' + type},
                zIndex: 1
            }],responsive: {
                rules: [{
                    condition: {
                        maxWidth: 700
                    },
                    chartOptions: {
                        chart: {zoomType: zoomVar, marginLeft: 50, marginRight: 50},
                        xAxis: [{
                            type: 'datetime',
                            categories: categoriesDateFourteen,
                            labels: {
                                format: '{value}',
                                style: {color: Highcharts.getOptions().colors[4], fontSize: 7},
                                y: 30,
                                x: 10
                            }
                        }],
                    }
                }]
            }
        });
        $('#weatherTen').highcharts({
            chart: {zoomType: zoomVar, marginLeft: 60, marginRight: 60},
            title: {text: graphTitle},
            xAxis: [{
                type: 'datetime',
                categories: categoriesDateTen,
                labels: {format: '{value}', style: {color: Highcharts.getOptions().colors[4], fontSize: 12}, y: 30}
            }],
            yAxis: [{
                labels: {
                    format: '{value}°' + type,
                    style: {color: Highcharts.getOptions().colors[4], fontSize: 12}
                },
                title: {
                    text: 'TEMP.',
                    align: 'high',
                    offset: 0,
                    rotation: 0,
                    x: -10,
                    y: 10,
                    style: {color: Highcharts.getOptions().colors[0], fontSize: 12, fontWeight: 700}
                },
                lineWidth: 1,
                tickAmount: 6,
                showLastLabel: false
            }, {
                title: {
                    text: 'PRICIP.',
                    align: 'high',
                    offset: 0,
                    rotation: 0,
                    x: 8,
                    y: 10,
                    style: {color: Highcharts.getOptions().colors[1], fontSize: 12, fontWeight: 700}
                },
                labels: {format: '{value} ' + val_zn, style: {color: Highcharts.getOptions().colors[4], fontSize: 12}},
                lineWidth: 1,
                opposite: true,
                tickAmount: 6,
                showLastLabel: false
            }],
            tooltip: {borderColor: '#fff', headerFormat: '', pointFormat: '{point.y}'},
            legend: false,
            series: [{
                connectNulls: true,
                name: 'TEMP.',
                type: 'line',
                lineWidth: 2,
                marker: {lineWidth: 2, lineColor: '#fff6af', fillColor: '#fff6af'},
                data: tempDateTen,
                tooltip: {valueSuffix: '°' + type},
                zIndex: 3
            }, {
                name: 'PRICIP.',
                type: 'column',
                borderWidth: 0,
                maxPointWidth: 10,
                yAxis: 1,
                data: precipDateTen,
                tooltip: {valueSuffix: ' ' + val_zn},
                zIndex: 2
            }, {
                connectNulls: true,
                name: false,
                type: 'area',
                threshold: minTempTen,
                lineWidth: 0,
                fillColor: {
                    linearGradient: {x1: 1, y1: 0, x2: 1, y2: 1},
                    stops: [[0, 'rgba(255,245,174,0.3)'], [1, 'rgba(255,245,174,0)']]
                },
                marker: {lineWidth: 0, lineColor: '#fff6af', fillColor: '#fff6af',},
                data: tempDateTen,
                tooltip: {valueSuffix: '°' + type},
                zIndex: 1
            }],
            responsive: {
            rules: [{
                condition: {
                    maxWidth: 700
                },
                chartOptions: {
                    chart: {zoomType: zoomVar, marginLeft: 50, marginRight: 50},
                    xAxis: [{
                        type: 'datetime',
                        categories: categoriesDateTen,
                        labels: {format: '{value}', style: {color: Highcharts.getOptions().colors[4], fontSize: 8}, y: 30, x: 10}
                    }],
                }
            }]
        }
        });
        if ($(document).width() <= 700) {
            $('#weatherDetailed').highcharts({
                chart: {zoomType: zoomVar, marginLeft: 17, marginRight: 17},
                title: {text: graphTitle},
                xAxis: [{
                    type: 'datetime',
                    categories: categoriesDetailed,
                    labels: {format: '{value}', style: {color: Highcharts.getOptions().colors[4], fontSize: 8}, y: 10},
                    gridLineWidth: 1,
                    ordinal: false,
                    min: 0,
                    minPadding: 100,
                    endOnTick: false
                }],
                yAxis: [
                    {

                        labels: {
                            format: '{value}',
                            style: {color: Highcharts.getOptions().colors[4], fontSize: 8},
                            x: -5,
                            y: 3
                        },
                        title: {
                            text: '°'+type,
                            align: 'high',
                            offset: 0,
                            rotation: 0,
                            x: -3,
                            y: 3,
                            style: {color: Highcharts.getOptions().colors[0], fontSize: 7, fontWeight: 700}
                        },
                        lineWidth: 1,
                        tickAmount: 6,
                        showLastLabel: false
                    }, {labels: {format: '{value} ', style: {color: Highcharts.getOptions().colors[4], fontSize: 7},
                        x: 5,
                        y: 3
                    },
                        title: {
                            text: val_zn,
                            align: 'high',
                            offset: 0,
                            rotation: 0,
                            x: 3,
                            y: 3,
                            style: {color: Highcharts.getOptions().colors[1], fontSize: 7, fontWeight: 700}
                        },

                        lineWidth: 1,
                        opposite: true,
                        tickAmount: 6,
                        showLastLabel: false
                    }],
                tooltip: {borderColor: '#fff', headerFormat: '', pointFormat: '{point.y}'},
                legend: false,
                scrollbar: {
                    enabled: true
                },
                series: [{
                    connectNulls: true,
                    name: 'TEMP.',
                    type: 'line',
                    lineWidth: 1,
                    marker: {lineColor: '#fff6af', fillColor: '#fff6af', width: 4, height: 4},
                    data: tempDetailed,
                    tooltip: {valueSuffix: '°' + type},
                    zIndex: 3
                }, {
                    name: 'PRICIP.',
                    type: 'column',
                    borderWidth: 0,
                    maxPointWidth: 10,
                    yAxis: 1,
                    data: precipDetailed,
                    tooltip: {valueSuffix: ' ' + val_zn},
                    zIndex: 2
                }, {
                    connectNulls: true,
                    name: false,
                    type: 'area',
                    threshold: minTempDetailed,
                    lineWidth: 0,
                    fillColor: {
                        linearGradient: {x1: 1, y1: 0, x2: 1, y2: 1},
                        stops: [[0, 'rgba(255,245,174,0.3)'], [1, 'rgba(255,245,174,0)']]
                    },
                    marker: {lineWidth: 0, lineColor: '#fff6af', fillColor: '#fff6af',},
                    data: tempDetailed,
                    tooltip: {valueSuffix: '°' + type},
                    zIndex: 1
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                align: 'center',
                                verticalAlign: 'bottom',
                                layout: 'horizontal'
                            },
                            subtitle: {
                                text: null
                            },
                            credits: {
                                enabled: false
                            }
                        }
                    }]
                }
            });
        } else {

            $('#weatherDetailed').highcharts({
                chart: {zoomType: zoomVar, marginLeft: 60, marginRight: 60},
                title: {text: graphTitle},
                xAxis: [{
                    type: 'datetime',
                    categories: categoriesDetailed,
                    labels: {format: '{value}', style: {color: Highcharts.getOptions().colors[4], fontSize: 12}, y: 30}
                }],
                yAxis: [{
                    labels: {
                        format: '{value}°' + type,
                        style: {color: Highcharts.getOptions().colors[4], fontSize: 12}
                    },
                    title: {
                        text: 'TEMP.',
                        align: 'high',
                        offset: 0,
                        rotation: 0,
                        x: -10,
                        y: 10,
                        style: {color: Highcharts.getOptions().colors[0], fontSize: 12, fontWeight: 700}
                    },
                    lineWidth: 1,
                    tickAmount: 6,
                    showLastLabel: false
                }, {
                    title: {
                        text: 'PRICIP.',
                        align: 'high',
                        offset: 0,
                        rotation: 0,
                        x: 15,
                        y: 10,
                        style: {color: Highcharts.getOptions().colors[1], fontSize: 12, fontWeight: 700}
                    },
                    labels: {format: '{value} ' + val_zn, style: {color: Highcharts.getOptions().colors[4], fontSize: 12}},
                    lineWidth: 1,
                    opposite: true,
                    tickAmount: 6,
                    showLastLabel: false
                }],
                tooltip: {borderColor: '#fff', headerFormat: '', pointFormat: '{point.y}'},
                legend: false,
                series: [{
                    connectNulls: true,
                    name: 'TEMP.',
                    type: 'line',
                    lineWidth: 2,
                    marker: {lineWidth: 2, lineColor: '#fff6af', fillColor: '#fff6af'},
                    data: tempDetailed,
                    tooltip: {valueSuffix: '°' + type},
                    zIndex: 3
                }, {
                    name: 'PRICIP.',
                    type: 'column',
                    borderWidth: 0,
                    maxPointWidth: 10,
                    yAxis: 1,
                    data: precipDetailed,
                    tooltip: {valueSuffix: ' ' + val_zn},
                    zIndex: 2
                }, {
                    connectNulls: true,
                    name: false,
                    type: 'area',
                    threshold: minTempDetailed,
                    lineWidth: 0,
                    fillColor: {
                        linearGradient: {x1: 1, y1: 0, x2: 1, y2: 1},
                        stops: [[0, 'rgba(255,245,174,0.3)'], [1, 'rgba(255,245,174,0)']]
                    },
                    marker: {lineWidth: 0, lineColor: '#fff6af', fillColor: '#fff6af',},
                    data: tempDetailed,
                    tooltip: {valueSuffix: '°' + type},
                    zIndex: 1
                }]
            });
        }
        $('#weatherYear').highcharts({
            chart: {
                zoomType: zoomVar,
                margin: 60,
                backgroundColor: '#01CAA8',
                style: {fontFamily: "'Unica One', sans-serif"},
                plotBorderColor: '#606063'
            },
            title: {text: year_title},
            xAxis: [{
                type: 'datetime',
                gridLineColor: '#40F9D7',
                lineColor: '#40F9D7',
                categories: categoriesYear,
                labels: {format: '{value}', style: {color: Highcharts.getOptions().colors[4], fontSize: 12}, y: 30}
            }],
            yAxis: [{
                gridLineColor: '#40F9D7',
                lineColor: '#40F9D7',
                labels: {format: '{value}°' + type, style: {color: Highcharts.getOptions().colors[4], fontSize: 12}},
                title: {
                    text: 'TEMP.',
                    align: 'high',
                    offset: 0,
                    rotation: 0,
                    x: -10,
                    y: 10,
                    style: {color: Highcharts.getOptions().colors[0], fontSize: 12, fontWeight: 700}
                },
                lineWidth: 1,
                tickAmount: 8,
                showLastLabel: false
            }, {
                gridLineColor: '#40F9D7',
                lineColor: '#40F9D7',
                title: {
                    text: 'PRICIP.',
                    align: 'high',
                    offset: 0,
                    rotation: 0,
                    x: 15,
                    y: 10,
                    style: {color: Highcharts.getOptions().colors[1], fontSize: 12, fontWeight: 700}
                },
                labels: {format: '{value} ' + val_zn, style: {color: Highcharts.getOptions().colors[4], fontSize: 12}},
                lineWidth: 1,
                opposite: true,
                tickAmount: 8,
                showLastLabel: false
            }],
            tooltip: {borderColor: '#fff', headerFormat: '', pointFormat: '{point.y}'},
            legend: false,
            series: [{
                connectNulls: true,
                name: 'TEMP.',
                type: 'line',
                lineWidth: 2,
                color: '#08FCF7',
                marker: {
                    lineWidth: 2,
                    lineColor: '#08FCF7',
                    fillColor: '#00D7A8',
                    symbol: 'circle',
                    states: {hover: {fillColor: '#08FCF7', radius: 4,}}
                },
                data: tempMinDateYear,
                tooltip: {valueSuffix: '°' + type},
                zIndex: 3
            }, {
                connectNulls: true,
                name: 'TEMP.',
                type: 'line',
                lineWidth: 2,
                marker: {lineWidth: 2, lineColor: '#fff6af', fillColor: '#01CAA8', symbol: 'circle'},
                data: tempMaxDateYear,
                tooltip: {valueSuffix: '°' + type},
                zIndex: 3
            }, {
                connectNulls: true,
                name: false,
                type: 'area',
                threshold: minTempYear,
                lineWidth: 0,
                fillColor: {
                    linearGradient: {x1: 1, y1: 0, x2: 1, y2: 1},
                    stops: [[0, 'rgba(8,255,247,0.3)'], [1, 'rgba(8,255,247,0)']]
                },
                marker: {lineWidth: 0, lineColor: '#fff6af', fillColor: '#018ac1',},
                data: tempMinDateYear,
                tooltip: {valueSuffix: '°' + type},
                zIndex: 2
            }, {
                name: 'PRICIP.',
                type: 'column',
                borderWidth: 0,
                maxPointWidth: 10,
                yAxis: 1,
                color: '#F4979C',
                data: precipDateYear,
                tooltip: {valueSuffix: ' ' + val_zn},
                zIndex: 2
            }, {
                connectNulls: true,
                name: false,
                type: 'area',
                threshold: minTempYear,
                lineWidth: 0,
                fillColor: {
                    linearGradient: {x1: 1, y1: 0, x2: 1, y2: 1},
                    stops: [[0, 'rgba(255,245,174,0.5)'], [1, 'rgba(255,245,174,0)']]
                },
                marker: {lineWidth: 0, lineColor: '#fff6af', fillColor: '#018ac1',},
                data: tempMaxDateYear,
                tooltip: {valueSuffix: '°' + type},
                zIndex: 1
            }]
        });
    });

    function ParticleModel(config) {
        var $scope = this;
        var MAX_SIZE = 180;
        var MIN_SIZE = 20;
        var MAX_SPEED = 50;
        var MIN_SPEED = 2;
        var MAX_OPACITY = 0.5;
        var MIN_OPACITY = 0.2;
        var MAX_VECTOR = 360;
        var MIN_VECTOR = 0;
        var MAX_LIFE = 30000;
        var MIN_LIFE = 20000;
        var defaults = {
            displayed: false,
            ended: false,
            size: 0,
            x: 0,
            y: 0,
            speed: 0,
            opacity: 1,
            vector: 0,
            domElement: angular.element(document.createElement('div')).addClass('particle'),
            id: undefined,
            boxSize: {width: 0, height: 0},
            header: undefined,
            controller: undefined
        };
        $scope.config = angular.extend(defaults, config);
        var rand_range = function (min, max, round) {
            if (round === undefined) {
                return Math.floor(Math.random() * (max - min) + min);
            } else if (round === false) {
                return Math.random() * (max - min) + min;
            }
        };
        $scope.init = function () {
            $scope.config.size = rand_range(MIN_SIZE, MAX_SIZE);
            $scope.config.speed = rand_range(MIN_SPEED, MAX_SPEED);
            $scope.config.x = rand_range(0, $scope.config.boxSize.width);
            $scope.config.y = rand_range(0, $scope.config.boxSize.height);
            $scope.config.opacity = rand_range(MIN_OPACITY, MAX_OPACITY, false);
            if ($scope.config.size > 100) {
                $scope.config.opacity = rand_range(0.01, 0.2, false);
            }
            $scope.config.blur = $scope.config.size / 8;
            $scope.config.vector = rand_range(MIN_VECTOR, MAX_VECTOR);
            $scope.config.xspeed = Math.cos($scope.config.vector) * $scope.config.speed;
            $scope.config.yspeed = Math.sin($scope.config.vector) * $scope.config.speed;
            var createTime = new Date().getTime();
            var expires = new Date().getTime() + rand_range(MIN_LIFE, MAX_LIFE);
            $scope.config.life = expires - createTime;

            function particleEnd() {
                if ($scope.config.displayed === false) {
                    $scope.config.displayed = true;
                    return;
                }
                if ($scope.config.ended === false) {
                    $scope.config.domElement.css({
                        transition: 'opacity 1s linear',
                        WebkitTransition: 'opacity 1s linear',
                        MozTransition: 'opacity 1s linear',
                    });
                    var style1 = document.querySelector('style#style-' + $scope.config.id);
                    style1.innerHTML = '.animated-' + $scope.config.id + ' { opacity: 0 !important; transform: translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) !important; -webkit-transform: translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) !important; -moz-transform: translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) !important; }';
                    $scope.config.ended = true;
                    return;
                }
                var style = document.querySelector('style#style-' + $scope.config.id);
                document.getElementsByTagName('head')[0].removeChild(style);
                $scope.config.ended = true;
                $scope.config.domElement[0].parentNode.removeChild($scope.config.domElement[0]);
                var p = new ParticleModel({
                    id: $scope.config.controller.numParticles,
                    boxSize: {width: $scope.config.header[0].offsetWidth, height: $scope.config.header[0].offsetHeight},
                    header: $scope.config.header,
                    controller: $scope.config.controller
                }).init();
                $scope.config.controller.numParticles++;
                $scope.config.header.append(p.config.domElement);
            }

            $scope.config.domElement[0].addEventListener('webkitTransitionEnd', particleEnd);
            $scope.config.domElement[0].addEventListener('transitionend', particleEnd);
            $scope.updateDOMStyles();
            $scope.config.x += Math.floor($scope.config.xspeed * $scope.config.life / 1000);
            $scope.config.y += Math.floor($scope.config.yspeed * $scope.config.life / 1000);
            $scope.updateXY();
            return $scope;
        };
        $scope.updateDOMStyles = function () {
            $scope.config.domElement.css({
                width: $scope.config.size + 'px',
                height: $scope.config.size + 'px',
                borderRadius: $scope.config.size / 2 + 'px',
                webkitFilter: 'blur(' + $scope.config.blur + 'px)',
                filter: 'blur(' + $scope.config.blur + 'px)',
                transition: 'transform ' + $scope.config.life / 1000 + 's linear, opacity 1s linear',
                WebkitTransition: '-webkit-transform ' + $scope.config.life / 1000 + 's linear, opacity 1s linear',
                MozTransition: '-moz-transform ' + $scope.config.life / 1000 + 's linear, opacity 1s linear',
                transform: 'translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) scale3d(1,1,1)',
                webkitTransform: 'translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) scale3d(1,1,1)',
                MozTransform: 'translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) scale3d(1,1,1)'
            });
        };
        $scope.updateXY = function () {
            var className = 'animated-' + $scope.config.id;
            var style = document.createElement('style');
            style.type = 'text/css';
            style.id = 'style-' + $scope.config.id;
            style.innerHTML = '.' + className + ' { opacity: ' + $scope.config.opacity + ' !important; transform: translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) scale3d(1,1,1) !important; -webkit-transform: translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) scale3d(1,1,1) !important; -moz-transform: translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) scale3d(1,1,1) !important; }';
            document.getElementsByTagName('head')[0].appendChild(style);
            setTimeout(function () {
                $scope.config.domElement.addClass(className);
            }, 100);
        };
        return $scope;
    }

    function ParticleController(config) {
        var $scope = this;
        $scope.numParticles = 0;
        var defaults = {numberOfParticles: 0, header: undefined};
        $scope.config = angular.extend(defaults, config);
        $scope.init = function () {
            console.log($scope.config.header);
            for (var i = 0; i < $scope.config.numberOfParticles; i++) {
                var p = new ParticleModel({
                    id: i,
                    boxSize: {width: $scope.config.header[0].offsetWidth, height: $scope.config.header[0].offsetHeight},
                    header: $scope.config.header,
                    controller: $scope
                }).init();
                $scope.numParticles++;
                $scope.config.header.append(p.config.domElement);
            }
        };
        return $scope;
    }
}
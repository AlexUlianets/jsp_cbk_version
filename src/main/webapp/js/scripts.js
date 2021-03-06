function loadScript() {
    $(document).ready(function () {

        setTimeout(function () {
            $('.load_header').fadeOut("slow", function () {
                $(this).css({'display': 'none'});
                // $('#top-page').find('#head-bot-mini').css({'display': 'block'});
                $('#top-page').find('.container').css({'visibility': 'visible'});
                $('#top-page').find('.head-bot-mini').css({'display': 'block'});
                $('#top-page').find('.head-bot').css({'display': 'block'});
                $('#top-main').find('.container').css({'visibility': 'visible'});
                $('#top-main').find('.head-bot-mini').css({'display': 'block'});
                $('#top-main').find('.head-bot').css({'display': 'block'});
                // $('#top-main').find('#head-bot').css({'display': 'block'});
                // $('.tb-contant').removeClass('inner-html')
            })
        }, 100)

        setTimeout(function () {
            $('.load_body').fadeOut("slow", function () {
                $(this).css({'display': 'none'});
                $('.body_wrapper').css({'visibility': 'visible'});
                $('.main-bot-banner').css({'visibility': 'visible'});

            })
        }, 500)
        setTimeout(function () {
                $('.tb-tabs-header').css({'display': 'inline-block!important'});
        }, 1000)
        $('.mob_weater').click(function (e) {
            e.preventDefault()
        });
        $("head").append("<link href='https://fonts.googleapis.com/css?family=Fira+Sans:300,400,500,700' rel='stylesheet'>");
        $('.temp-block').on('click', function (e) {
            $this = $(this);
            $this.addClass('active').siblings().removeClass('active');
            $('#main-menu , #nav-toggle, #h-menu').removeClass('active');
            $('#h-share').removeClass('active');
            $('.h-lang').removeClass('active');
        });
        $('.temp-wrap').on('click', function (e) {
            $(this).toggleClass('open');
        });
        $('body').on('click', function () {
            $('.temp-wrap').removeClass('open');
        });
        $('.temp-wrap').on('click', function (e) {
            e.stopPropagation();
        });
        $('#nav-toggle').on('click', function (e) {
            $(".blur").toggleClass("the-blur");
            e.preventDefault();
            var $this = $(this);
            $this.toggleClass('active');
            $('#h-menu, #main-menu').toggleClass('active');
            $('.temp-wrap').removeClass('open');
        });
        $(document).on('mouseup', function (e) {
            e.preventDefault();
            var div = $("#main-menu");
            if (!div.is(e.target) && div.has(e.target).length === 0 && $('#nav-toggle').has(e.target).length === 0) {
                $('#main-menu , #nav-toggle, #h-menu').removeClass('active');
                $(".blur").removeClass("the-blur");
            }
        })
        var MenuChangeToResolution = function () {
            if ($(window).width() <= 700) {
                $('.pn-top ul li:first').show();
                $('.page-nav li a').each(function (i, elem) {
                    if ($(this).hasClass("active")) {
                        $('.pn-top ul li:first a').text(elem.text);
                    }
                })
                $('body').click(function (e) {
                    if($(e.target)[0]['localName']!=='a') {
                        $('.pn-top ul li:not(:first), .pn-bot ul li').fadeOut("slow");
                    }
                });
            } else {
                $('.mob_weater').css('display', 'none');
            }

        };
        MenuChangeToResolution();
        $(window).resize(function () {
            MenuChangeToResolution();
        })
        var $nav = $('.text-weather-nav nav ul li a');
        var $tab = $('.text-weather-tab');
        $nav.eq(0).addClass('active');
        $tab.not(":first").hide();
        $nav.on('click', function (event) {
            event.preventDefault();
            var $this = $(this);
            var $href = $this.attr('href');
            $($href).fadeIn().siblings('.text-weather-tab').hide();
            $this.addClass('active').parent().siblings().find('a').removeClass('active');
            $(".blur").removeClass("the-blur");
        });
        $('.forecast-row-inner-wrap, .hour-row-inner-wrap').hide();
        $('.forecast-row.active, .hour-row.active').next('.forecast-row-inner-wrap, .hour-row-inner-wrap').show();
        $('.forecast-row, .hour-row').on('click', function (e) {
            var $this = $(this);
            var $innner = $('.forecast-row-inner-wrap, .hour-row-inner-wrap');
            $this.addClass('active').parent().siblings().find('.forecast-row, .hour-row').removeClass('active');
            var is_visible = $('.forecast-row.active, .hour-row.active').next('.forecast-row-inner-wrap, .hour-row-inner-wrap').is(':visible');
            if (is_visible) {
                $('.hour-row').removeClass('active');
            } else {
                $this.addClass('active');
            }
            $this.parent().find($innner).slideToggle();
            $this.parent().siblings().find($innner).slideUp();
        });
        $('.for-arr-top').on('click', function () {
            $(this).parent().slideUp();
        });
        if ($(window).width() > 700) {
            $(".tab_drawer_heading[rel^='tab1']").addClass("d_active");
            $(".tab_drawer_heading[rel^='hov-tab1']").addClass("d_active");
            $("#tab1").show();
            $("#hov-tab1").show();
        }

        if ($("ul.tabs").length > 1) {
            $("ul.tabs").each(function (i) {
            });
        } else {

        }
        $(".tab_drawer_heading").click(function () {
            if ($('#' + ($(this).attr("rel"))).css('display') == 'none' && $(window).width() < 400) {
                $(".tab_content").hide();
                var d_activeTab = $(this).attr("rel");
                $("#" + d_activeTab).fadeIn();
                $(".tab_drawer_heading").removeClass("d_active");
                $(this).addClass("d_active");
                $("ul.tabs li").removeClass("active");
                $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
            } else if ($('#' + ($(this).attr("rel"))).css('display') == 'block' && $(window).width() < 400) {
                $('.tab_content').slideUp();
                $(".tab_drawer_heading").removeClass("d_active");
            } else if ($(window).width() > 400) {
                $(".tab_content").hide();
                var d_activeTab = $(this).attr("rel");
                $("#" + d_activeTab).fadeIn();
                $(".tab_drawer_heading").removeClass("d_active");
                $(this).addClass("d_active");
                $("ul.tabs li").removeClass("active");
                $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
            }
        });
        $('.tab-arrow').on('click', function () {
            $('.tab_content').slideUp();
            $(".tab_drawer_heading").removeClass("d_active");
        });
        $('ul.tabs li').last().addClass("tab_last");
        var $width = $(document).width();
        if ($width <= 700) {

        }
        $(document).on("click", ".transformer-tabs a:not('.active')", function (event) {
            event.preventDefault();
            var $this = $(this);
            var $hash = $(this).attr('rel');
            $this.addClass('active').parent().siblings().find('a').removeClass('active');
            $($hash).addClass("active").siblings().removeClass("active");
            $this.closest("ul").toggleClass("open");
        }).on("click", ".transformer-tabs a.active", function (event) {
            event.preventDefault();
            var $this = $(this);
            $this.closest("ul").toggleClass("open");
        });
        $('.a-popup, .s-popup').magnificPopup({
            removalDelay: 500, callbacks: {
                beforeOpen: function () {
                    this.st.mainClass = this.st.el.attr('data-effect');
                    $('.temp-wrap').removeClass('open');
                    $('.main-menu , #nav-toggle, .h-menu').removeClass('active');
                    $(".blur").removeClass("the-blur");
                }, afterClose: function () {
                },
            }, midClick: true
        });
        var popupToggleActive = function () {
            $('.settings-popup-md li a').on('click', function (e) {
                e.preventDefault();
                var $this = $(this);
                $this.addClass('active').parent().siblings().find('a').removeClass('active');
            });
            $('.spr-item').on('click', function (e) {
                e.preventDefault();
                var $this = $(this);
                $this.addClass('active').siblings().removeClass('active');
            });
        };
        popupToggleActive();
        $('.spr-item').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.addClass('active').siblings().removeClass('active');
        });
        var $dropdown = $('.search-dropdown');
        $('body').click(function (e) {
            if($(e.target)[0]['localName']!=='input'
                && $(e.target)[0]['localName']!=='i'
                && $(e.target)[0]['className']!=='ht-search-input'
                && $(e.target)[0]['className']!=='searchIco') {
                $('.search-dropdown').removeClass('opened');
                $('.search-dropdown').css({'display': 'none'})
            }
        })
        $('.ht-search-input input').click(function (e) {
            if(!$('.search-dropdown').hasClass('opened')) {
                $('.search-dropdown').addClass('opened');
                $('.search-dropdown').css({'display': 'block'})
            }
        });

        $('.dropdown-top').on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $dropdown.slideUp();
            $('.search-dropdown').removeClass('opened');
            $('.search-dropdown').css({'display': 'none'})
        });

        $(window).on('scroll resize', function () {
            if ($(window).width() > 767) {
                var HeaderTop = 111;
                $(window).scroll(function () {
                    if ($(window).scrollTop() > HeaderTop) {
                        $('#fix-menu').css({position: 'fixed', top: '0px'});
                    } else {
                        $('#fix-menu').css({position: 'absolute', top: '111px'});
                    }
                });
            }
            if ($(window).width() < 767) {
                var HeaderTop = 0;
                $(window).scroll(function () {
                    if ($(window).scrollTop() > HeaderTop) {
                        $('#fix-menu').css({position: 'fixed', top: '0px'});
                    } else {
                        $('#fix-menu').css({position: 'absolute', top: '0px'});
                    }
                });
            }
        });
        $('.s-popup').on('click', function (e) {
            $('#h-share').removeClass('active');
            $('.h-lang').removeClass('active');
            $('.temp-wrap').removeClass('open');
        })

        $('#h-share').on('click', function (e) {
            e.stopPropagation();
            $(this).toggleClass('active');
            $('.h-lang').removeClass('active');
            $('.temp-wrap').removeClass('open');
            $('#main-menu , #nav-toggle, #h-menu').removeClass('active');
            $(".blur").removeClass("the-blur");
        });
        $('.h-lang').on('click', function (e) {
            e.stopPropagation();
            $('#h-share').removeClass('active');
            $(this).toggleClass('active');
            $('.temp-wrap').removeClass('open');
            $('#main-menu , #nav-toggle, #h-menu').removeClass('active');
            $(".blur").removeClass("the-blur");
        });
        $('body').on('click', function () {
            $('#h-share').removeClass('active');
            $('.h-lang').removeClass('active');
            $('.ht-search-input input').val('')
        });


        function adaptiveWidth(elem, control, n) {
            //elem - ориентир, откуда берем ширину
            //control - чему присваеваем ширину
            var widthContent = $(elem).width();
            $(control).css('width', widthContent - n);
        }

        adaptiveWidth('.page-content', '.tb-slider-wrap', 20);
        $(window).resize(function () {
            adaptiveWidth('.page-content', '.tb-slider-wrap', 20);
        });

        //Activate widget search
        $(function () {
            $('.wg_search_keys').click(function () {
                if ($(this).hasClass('show_search')) {
                    $(this).removeClass('show_search');
                    $('.wg_form_resault').removeClass('active_search');
                } else {
                    $(this).addClass('show_search');
                    $('.wg_form_resault').addClass('active_search');
                }

            });

            //Exclude Item
            $('html,body').click(function (e) {
                //e.stopPropagation();

                if (!$(e.target).is(".wg_form_resault") && !$(e.target).parents(".wg_form_resault_wrap").length) {
                    $('.wg_search_keys').removeClass('show_search');
                    $('.wg_form_resault').removeClass('active_search');
                }
            });


        });

        //Activate styler for widget
        $(function () {
            $('.wg_radio input').styler();
        });

        /*
         ** Widget slider with nav
         */

        $(function () {

            $('#widget_carusel').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                pauseOnHover: false,
                focusOnSelect: true,
                prevArrow: '<button type="button" class="slick-prev slick-arrow"><</button>',
                nextArrow: '<button type="button" class="slick-next slick-arrow">></button>',
                responsive: [
                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 892,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 611,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]

            });

            /*
             ** Вставляем активный виджет в resizable окно
             */
            //При начальной загрузке
            if($("#widget_carusel").slick("getSlick").$slides!=undefined){
                var curruntSlide = $("#widget_carusel").slick("getSlick").$slides[0];
            }
            curruntSlide = $(curruntSlide).html();

            var currentWidget = $('.wg_respons_content .widget_nav');
            currentWidget.html(curruntSlide);

            //После смены активного слайда
            $('#widget_carusel').on('afterChange', function (event, slick, currentSlide, nextSlide) {
                var curruntSlide = $(slick.$slides[currentSlide]).html();
                currentWidget.html(curruntSlide);
                //$('.content').hide();
                //$('.content[data-id=' + dataId + ']').show();
            });

        });


        $(function () {

            var maxHeight = 755,
                maxWidth = 755,
                minHeight = 50,
                minWidth = 100,
                startWidth = 300,
                startHeight = 250;

            //задаем начальные параметры виджету
            $('#wg_width').val(startWidth).attr('value', startWidth);
            $('#wg_height').val(startHeight).attr('value', startHeight);
            $('.wg_respons_box').css({
                width: startWidth,
                height: startHeight
            });
            changeWidgetClassWidht('.wg_response_wrap', startWidth);
            changeWidgetClassHeight('.wg_response_wrap', startHeight);

            //widget resizable
            $('.wg_respons_box').resizable({
                maxHeight: maxHeight,
                maxWidth: maxWidth,
                minHeight: minHeight,
                minWidth: minWidth,
                handles: {
                    e: '.handles_right',
                    s: '.handles_bottom'
                },
                resize: function (event, ui) {
                    var widthR = ui.size.width;
                    var heightR = ui.size.height;
                    //var className =
                    $('.response_settings #wg_width').val(widthR);
                    $('.response_settings #wg_height').val(heightR);
                    changeWidgetClassWidht('.wg_response_wrap', widthR);
                    changeWidgetClassHeight('.wg_response_wrap', heightR);
                    /*$('.wg_respons_content .wg_nav_item').css({
                     width: widthR,
                     height: heightR
                     });
                     $('.current_widget').slick('resize');*/
                }
            });


            //input change width
            $('.response_settings #wg_width').change(function () {
                var currentSize = $(this).val();

                if (currentSize > maxWidth) {
                    $(this).val(maxWidth);
                    $(this).attr('value', maxWidth);
                    animateWidth('.wg_respons_box', maxWidth);
                }
                else if (currentSize < minWidth) {
                    $(this).val(minWidth);
                    $(this).attr('value', minWidth);
                    animateWidth('.wg_respons_box', minWidth);
                } else {
                    $(this).val(currentSize);
                    $(this).attr('value', currentSize);
                    animateWidth('.wg_respons_box', currentSize);
                }
                changeWidgetClassWidht('.wg_response_wrap', currentSize);
            });

            //input change height
            $('.response_settings #wg_height').change(function () {
                var currentSize = $(this).val();

                if (currentSize > maxHeight) {
                    $(this).val(maxHeight);
                    $(this).attr('value', maxHeight);
                    animateHeight('.wg_respons_box', maxHeight);
                }
                else if (currentSize < minHeight) {
                    $(this).val(minHeight);
                    $(this).attr('value', minHeight);
                    animateHeight('.wg_respons_box', minHeight);
                } else {
                    $(this).val(currentSize);
                    $(this).attr('value', currentSize);
                    animateHeight('.wg_respons_box', currentSize);
                }
                changeWidgetClassHeight('.wg_response_wrap', currentSize);
            });


        });

        function animateWidth(elem, size) {
            $(elem).animate({
                width: size
            }, 500);
        }

        function animateHeight(elem, size) {
            $(elem).animate({
                height: size
            }, 500);
        }

        //функция, добавления класса
        function addClassWild(elem, className) {
            $(elem).addClass(className);
        }

        //функция удаления класа
        // использовать как $('.wg_response_wrap').removeClassWild('wg_width_*');
        $.fn.removeClassWild = function (mask) {
            return this.removeClass(function (index, cls) {
                var re = mask.replace(/\*/g, '\\S+');
                return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
            });
        };

        /*
         ** Функция проверки ширины. Добавляет и удаляет класы
         * в зависимости от ширины виджета с помощью функций addClassWild и removeClassWild
         */
        function changeWidgetClassWidht(element, currentWidth) {
            if (currentWidth < 150) {
                $(element).removeClassWild('wg_width_*');
                addClassWild(element, 'wg_width_100');
            } else if (currentWidth >= 150 && currentWidth < 210) {
                $(element).removeClassWild('wg_width_*');
                addClassWild(element, 'wg_width_150');
            } else if (currentWidth >= 210 && currentWidth < 300) {
                $(element).removeClassWild('wg_width_*');
                addClassWild(element, 'wg_width_210');
            } else if (currentWidth >= 300 && currentWidth < 400) {
                $(element).removeClassWild('wg_width_*');
                addClassWild(element, 'wg_width_300');
            } else if (currentWidth >= 400 && currentWidth <= 600) {
                $(element).removeClassWild('wg_width_*');
                addClassWild(element, 'wg_width_600');
            } else if (currentWidth > 600 && currentWidth <= 728) {
                $(element).removeClassWild('wg_width_*');
                addClassWild(element, 'wg_width_728');
            } else {
                $(element).removeClassWild('wg_width_*');
                addClassWild(element, 'wg_width_755');
            }
        }

        /*
         ** Функция проверки высоты. Добавляет и удаляет класы
         * в зависимости от высоты виджета с помощью функций addClassWild и removeClassWild
         */
        function changeWidgetClassHeight(element, currentHeight) {
            if (currentHeight < 100) {
                $(element).removeClassWild('wg_height_*');
                addClassWild(element, 'wg_height_50');
            } else if (currentHeight >= 100 && currentHeight <= 150) {
                $(element).removeClassWild('wg_height_*');
                addClassWild(element, 'wg_height_100');
            } else if (currentHeight > 150 && currentHeight <= 170) {
                $(element).removeClassWild('wg_height_*');
                addClassWild(element, 'wg_height_170');
            } else if (currentHeight > 170 && currentHeight <= 193) {
                $(element).removeClassWild('wg_height_*');
                addClassWild(element, 'wg_height_193');
            } else if (currentHeight > 193 && currentHeight <= 250) {
                $(element).removeClassWild('wg_height_*');
                addClassWild(element, 'wg_height_250');
            } else if (currentHeight > 250 && currentHeight <= 400) {
                $(element).removeClassWild('wg_height_*');
                addClassWild(element, 'wg_height_350');
            } else if (currentHeight > 400 && currentHeight <= 600) {
                $(element).removeClassWild('wg_height_*');
                addClassWild(element, 'wg_height_600');
            } else {
                $(element).removeClassWild('wg_height_*');
                addClassWild(element, 'wg_height_755');
            }
        }
    });

    function setIdle(cb, seconds) {
        var timer;
        var interval = seconds * 1000;
        function refresh() {
            clearInterval(timer);
            timer = setTimeout(cb, interval);
        };
        $(document).on('keypress click', refresh);
        refresh();
    }

    function refreshSlick(cb, seconds) {
        var timer;
        var interval = seconds * 1000;
        function refresh() {
            clearInterval(timer);
            timer = setTimeout(cb, interval);
        };
        refresh();
    }


    refreshSlick(function () {
        $(window).resize();
    }, 2);


    setIdle(function() {
        location.href = location.href;
    }, 15 * 60);



}
function activateTab(index) {
    var activeTab = "tab" + index;
    $("#" + activeTab).fadeIn();
    $("ul.tabs li").removeClass("active");
    $(".tabclass" + index).addClass("active");
    $(".tab_drawer_heading").removeClass("d_active");
    $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");
}
function activeMenu() {
    var $width = $(document).width();
    if ($width <= 700) {
        if ($('.pn-top ul li:not(:first), .pn-bot ul li').css('display') === 'list-item') {
            $('.pn-top ul li:not(:first), .pn-bot ul li').each(function () {
                $(this).fadeOut("slow");
            })
        } else {
            $('.pn-top ul li:not(:first), .pn-bot ul li').each(function () {
                $(this).css({'display': 'list-item'})
            })
        }
    }
}
//
// function activateTabHourly(index) {
//     var activeTab = "tab" + index;
//     $("#" + activeTab).fadeIn();
//     $(this).siblings().removeClass("active");
//     $(".tabclass" + index).addClass("active");
//     $(".tab_drawer_heading").removeClass("d_active");
//     $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");
// }
function onIcoSearch() {
    if(!$('.search-dropdown').hasClass('opened')) {
        $('.search-dropdown').addClass('opened');
        $('.search-dropdown').css({'display': 'block'})
    } else {
        $('.search-dropdown').removeClass('opened');
        $('.search-dropdown').css({'display': 'none'})
    }
}
function changeTimeFormat(str, timeFormat) {

    if( parseInt(timeFormat) === 24 ){
        var option=1;
        var tokens = /([10]?\d):([0-5]\d) ([ap]m)/i.exec(str);
        if (tokens == null) {
            tokens = /([10]?\d) ([ap]m)/i.exec(str)
            option=2;
        }
        if (tokens == null) {
            return str;
        }
        if(option===2){
            if (tokens[2].toLowerCase() === 'pm' && tokens[1] !== '12') {
                tokens[1] = '' + (12 + (+tokens[1]));
            } else if (tokens[2].toLowerCase() === 'am' && tokens[1] === '12') {
                tokens[1] = '00';
            }
            return tokens[1] + ':00';
        }else {
            if (tokens[3].toLowerCase() === 'pm' && tokens[1] !== '12') {
                tokens[1] = '' + (12 + (+tokens[1]));
            } else if (tokens[3].toLowerCase() === 'am' && tokens[1] === '12') {
                tokens[1] = '00';
            }
            return tokens[1] + ':' + tokens[2];
        }


    }else if(str!=undefined && str!=='0:0'){
        var time =  toDate(str,"h:m");

        if (time == 'Invalid Date') { return str; }

        var hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
        var am_pm = time.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();

        time = hours + ":" + minutes + " " + am_pm;

        return time;
    }
}

function toDate(dStr,format) {
    var now = new Date();
    if (format == "h:m") {
        now.setHours(dStr.substr(0,dStr.indexOf(":")));
        now.setMinutes(dStr.substr(dStr.indexOf(":")+1));
        now.setSeconds(0);
        return now;
    }else
        return "Invalid Format";
}

// создаём плагин resizer
jQuery.fn.resizer = function () {
    // выполняем плагин для каждого объекта
    return this.each(function () {
        // определяем объект
        var me = jQuery(this);
        // вставляем в после объекта...
        me.after(
            // в нашем случае это наш "ресайзер" и производим обработку события mousedown
            jQuery('<div class="resizehandle"></div>').bind('mousedown', function (e) {
                // определяем высоту textarea
                var h = me.height();
                // определяем кординаты указателя мыши по высоте
                var y = e.clientY;
                // фнкция преобразовывает размеры textarea
                var moveHandler = function (e) {
                    me.height(Math.max(20, e.clientY + h - y));
                };
                // функци прекращает обработку событий
                var upHandler = function (e) {
                    jQuery('html').unbind('mousemove', moveHandler).unbind('mouseup', upHandler);
                };
                // своего рода, инициализация, выше приведённых, функций
                jQuery('html').bind('mousemove', moveHandler).bind('mouseup', upHandler);
            })
        );
    });
}
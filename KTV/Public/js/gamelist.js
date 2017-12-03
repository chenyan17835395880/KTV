'use strict';

$(function () {

    $('.main').on('click', 'li', function () {
        $(this).css({ transform: 'rotateY(360deg)' });
    });
    $('.main').on('webkitTransitionEnd', 'li', function () {
        $(this).addClass('active');
        if ($('.main>li.active').length >= 3) {
            $('.change').addClass('active');
        }
    });
    //////////////////////////////////////////////////////////////换一换
    var type = location.search.slice(-1); //获取到type值
    var page = 1;
    $('.nav').on('click', '.change.active', function () {
        page++;
        $.ajax({
            type: 'GET',
            url: '/KTV/index.php/game/change',
            data: { type: type, page: page },
            dataType: 'json',
            success: function success(data) {
                rander(data);
            }
        });
    });
    /////////////////////////////////////////////////////////////选游戏按钮
    $('.botton>botton').on('click', function () {});
    $('.botton').on('click', function (e) {
        page = 1;
        /* $('.bot-left').removeClass('color');
         $('.bot-right').removeClass('color');
         $(e.target).addClass('color');*/
        // console.log(this);
        $('.botton>botton').removeClass('color');
        $('.botton>botton').toggleClass('color');
        var gtype = $(e.target).prop('id');
        location.search = '?type=' + gtype; //换游戏时要改一下type值
        $.ajax({
            url: '/KTV/index.php/game/change',
            data: { type: gtype, page: page },
            dataType: 'json',
            type: 'GET',
            success: function success(data) {
                rander(data);
            }
        });
        $('.bot-left').triggerHandler('click');
    });
    ////////////////////////////////////////////////////////////rander
    function rander(data) {
        $('.main').empty();
        var str = '';
        $.each(data, function (index, value) {
            str += '\n                <li> <a href="">' + value['gname'] + '</a></li>\n            ';
            // $('<li>').html(value.gname).appendTo($('.main'));
        });
        $('.main').html(str);
        myScroll.refresh();
    }
});
'use strict';

function loaded() {
    ///////////////////////////////////////////////////////////iscroll
    //提供一种原生的方式来支持在一个固定高度的容器内滚动内容
    var myScroll = void 0;
    myScroll = new IScroll('.wrapper', {
        click: true //配置项
    });

    ////////////////////////////////////////////////////////////////存储到本地
    var lis = $('.main>li');
    var add = $('.img4');
    var del = $('.img3');
    var list = localStorage.songs ? JSON.parse(localStorage.songs) : [];
    // let list=[];
    ///////////////////////////////////////////////////////////////添加，并且添加到本地
    var tianjia = $('.tianjia>img');
    tianjia.on('click', function (e) {
        e.preventDefault();
        /////////////////////////////////把数据存储到本地localStorage
        var data = $(this).parents('li').attr('data').split(';');
        // console.log(data)
        var data1 = { "name": data[1], "img": data[2] };
        var dataJ = JSON.parse(data[0]);
        var dataAll = $.extend(dataJ, data1); //获取到对应的个的所有信息
        // 合并两个json对象，合并后还是个json对象
        if ($(this).hasClass('active')) {
            list = list.filter(function (ele) {
                return ele.oid != dataAll.oid;
            }); ///?????
        } else {
            list.push(dataAll);
        }
        // console.log(list)
        localStorage.songs = JSON.stringify(list);
        // localStorage.setItem('songs',JSON.stringify(list));
        // console.log(JSON.stringify(list));


        ////////////////////////////////添加、删除的效果
        $(this).toggleClass('active');
        if (!$('.img4').hasClass('active')) {
            $('<div>').css({ width: '0.49rem', height: '0.49rem', position: 'absolute', background: '#ff318d',
                borderRadius: '50%', zIndex: 99999, left: $('.change').offset().left, top: $('.change').offset().top }).appendTo(document.body).animate({ left: $(this).offset().left, top: $(this).offset().top }, 600).queue(function () {
                // console.log(this);//div
                $(this).remove();
            });
            return;
        }
        $('<div>').css({ width: '0.49rem', height: '0.49rem', position: 'absolute', background: '#ff318d',
            borderRadius: '50%', zIndex: 99999, left: $(this).offset().left, top: $(this).offset().top }).appendTo(document.body).animate({ left: $('.change').offset().left, top: $('.change').offset().top }, 600).queue(function () {
            // console.log(this);//div
            $(this).remove();
        });
    });
}
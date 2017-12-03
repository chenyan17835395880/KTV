'use strict';

function loaded() {

    ///////////////////////////////////////////////////////////iscroll
    //提供一种原生的方式来支持在一个固定高度的容器内滚动内容
    var myScroll = void 0;
    myScroll = new IScroll('.drinklist', {
        click: true //配置项
    });
    myScroll = new IScroll('.snackslist', {
        click: true //配置项
    });

    //////////////////////////////////////////////////////////把内容添加到ul中
    var ul = $('ul');
    var chooselist = JSON.parse(localStorage.shop); //从本地存储中把数据拿过来
    rander(ul, chooselist); //把内容添加到ul中
    myScroll = new IScroll('.drinklist', {
        click: true //配置项
    });
    myScroll = new IScroll('.snackslist', {
        click: true //配置项
    });

    /////////////////把从本地存储的（也就是选的酒水和零食）先放到页面///////////////////
    //总数
    var counts = $('.counts');
    counts.html(randercounts(chooselist));
    //总价
    var totalnum = $('.right-right');
    totalnum.html(randerzongjia(chooselist)); //toFixed(2)保留两位小数


    /////////////////////////////////////////////////////////////添加数量
    $('.list').on('click', '.jia', function () {
        var goods = JSON.parse($(this).parents('li').attr("data")); //获取每个li的商品信息
        var panduan = chooselist.filter(function (element) {
            return element.sid == goods.sid;
        });
        if (panduan.length) {
            panduan[0].num++; //解决问题：就是点击添加的时候数字不会消失
            $(this).prev().html(panduan[0].num);
        }
        ////然后再选完以后，还要加的话就写在点击事件里////////
        //总数
        var counts = $('.counts');
        counts.html(randercounts(chooselist));
        //各自的总价
        rander(ul, chooselist);
        //总价
        var totalnum = $('.right-right');
        totalnum.html(randerzongjia(chooselist)); //toFixed(2)保留两位小数
    });

    /////////////////////////////////////////////////////////////减少数量
    $('.list').on('click', '.jian', function () {
        var goods = JSON.parse($(this).parents('li').attr("data")); //获取每个li的商品信息
        var panduan = chooselist.filter(function (element) {
            return element.sid == goods.sid;
        });
        if (panduan.length >= 1) {
            panduan[0].num--; //解决问题：就是点击添加的时候数字不会消失
            if (panduan[0].num == 0) {
                chooselist = chooselist.filter(function (ele) {
                    return ele.sid != goods.sid;
                });
                $(this).parents('li').animate({ marginLeft: '-100%' }).queue(function () {
                    $(this).remove();
                    myScroll.refresh();
                });
            }
            localStorage.setItem('shop', JSON.stringify(chooselist)); //数据筛选后要重新存一下
            $(this).next().html(panduan[0].num);
        }

        /////然后再选完以后，还要加的话就写在点击事件里///////
        //总数
        var counts = $('.counts');
        counts.html(randercounts(chooselist));
        //各自的总价
        rander(ul, chooselist);
        myScroll.refresh();
        //总价
        var totalnum = $('.right-right');
        totalnum.html(randerzongjia(chooselist)); //toFixed(2)保留两位小数
    });

    /////////////////////////////////////////////////////////////提交订单
    /*
    * 订单
    * orders：      oid user time status
    *
    *订单详情
    * orderextra:   eid sid  count total oid
    * */
    $('.bottom').on('click', function () {
        var orderArr = [];
        $.each(chooselist, function (index, value) {
            var obj = { sid: value.sid, count: value.num, total: (value.price.slice(0, 1) * value.num).toFixed(2) };
            orderArr.push(obj);
        });
        // console.log(orderArr);//获取到所有选的商品
        $.ajax({
            url: '/KTV/index.php/shop/submit',
            data: { order: orderArr },
            method: 'get',
            success: function success(data) {
                if (data == 'ok') {
                    location.href = '/KTV/index.php/shop/success';
                } else if (data == 'error') {
                    alert('error');
                }
            }
        });
    });

    ////////////////////////////////////////////////////////////总数
    function randercounts(data) {
        var num = 0;
        $.each(data, function (index, value) {
            num += value.num;
        });
        return num;
    }
    ///////////////////////////////////////////////////////////总价
    function randerzongjia(data) {
        var tnum = 0;
        $.each(data, function (index, value) {
            var p = value.price.substr(0, 1);
            // console.log(p);//单价:9
            tnum += value.num * p;
        });
        return tnum.toFixed(2); //toFixed(2)保留两位小数
    }
    //////////////////////////////////////////////////////////把从数据库获取的东西放到页面
    function rander(obj, data) {
        obj.empty();
        var str = '';
        $.each(data, function (index, value) {
            obj.html(
            // console.log(index)
            str += '\n                    <li  data=\'' + JSON.stringify(data[index]) + '\' class="lis">\n                        <div class="left">\n                            <img src="' + value['images'] + '" alt="">\n                        </div>\n                        <div class="right">\n                            <div class="right-top">\n                                <div class="sname">' + value['sname'] + '</div>\n                                <div class="introduce">' + value['description'] + '&nbsp;&nbsp;<span>' + value['srl'] + '</span></div>\n                            </div>\n                            <div class="zongjia">\n                                <div class="count">\n                                    <div class="jian">-</div>\n                                    <div class="shu">' + value['num'] + '</div>\n                                    <div class="jia">+</div>\n                                </div>\n                                <div class="price">' + value['num'] * value['price'].slice(0, 1) + '<span>RMB</span></div>\n                            </div>\n    \n                        </div>\n                    </li>\n                    \n                ');
        });
        myScroll.refresh();
    }
}
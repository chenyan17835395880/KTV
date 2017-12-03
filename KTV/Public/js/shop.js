'use strict';

function loaded() {

    ///////////////////////////////////////////////////////////iscroll
    //提供一种原生的方式来支持在一个固定高度的容器内滚动内容
    var myScroll = void 0;
    myScroll = new IScroll('.wine', {
        click: true
    });
    var myScroll1 = new IScroll('.snack', {
        click: true
    });
    ///////////////////////////////////////////////////////////选项卡:切换酒水和零食
    var nava = $('.nav>a');
    nava.on('click', function () {
        // console.log(this);//点哪个指向哪个
        nava.removeClass('active');
        $(this).addClass('active');
        var type = $(this).index(); //类型：决定酒水还是零食
        var lists = $('.wrapper');
        lists.removeClass('active');
        lists.eq(type).addClass('active');
    });

    $.ajax({
        url: '/KTV/index.php/shop/query',
        dataType: 'json',
        success: function success(data) {
            // console.log(data);//获取到shop表中的所有数据
            var drinklist = $('.drinklist');
            var snackslist = $('.snackslist');
            var drinkAll = [];
            var snacksAll = [];
            $.each(data, function (index, value) {
                // console.log(index,value);//下标和下标对应的值
                if (value['type'] == 1) {
                    drinkAll.push(value); //如果type=1的话，就把它放在定义的酒水数组中
                }
                if (value['type'] == 2) {
                    snacksAll.push(value); //如果type=2的话，就把它放在定义的零食数组中
                }
            });
            rander(drinklist, drinkAll);
            rander(snackslist, snacksAll);
            myScroll = new IScroll('.wine');
            myScroll1 = new IScroll('.snack');
        }
    });
    /////////////////////////////////////////////////////////////////添加数量
    var chooselist = [];
    $('.list').on('click', '.jia', function () {
        var goods = JSON.parse($(this).parents('li').attr("data")); //获取每个li的商品信息
        var panduan = chooselist.filter(function (element) {
            return element.sid == goods.sid;
        });
        /*判断chooselist里面是否存在一个商品的sid和当前点击的商品的sid相等，
        * 如果有的话，就给它添加一个属性num，并且让它进行++，并且把这个值放到显示数量的框里，
        * 如果没有的话，给它自己添加一个num属性，并且把这个值放到显示数量的框里*/
        if (panduan.length) {
            panduan[0].num++; //解决问题：就是点击添加的时候数字不会消失
            $(this).prev().html(panduan[0].num);
        } else {
            goods.num = 1;
            $(this).prev().html(1);
            chooselist.push(goods);
        }
        //////////////遍历chooselist数组，把数组中的每个商品的价格和num属性相乘,把这个值给了totalnum
        //总价
        var totalnum = $('.totalnum');
        totalnum.html(randerzongjia(chooselist)); //toFixed(2)保留两位小数

        /////////////遍历chooselist数组，当type=1时，给酒水的数量++；当type=2时，给零食的数量++
        //各自的数量
        var drinknum = $('.drinknum');
        var dnum = 0;
        var snacksnum = $('.snacksnum');
        var snum = 0;
        $.each(chooselist, function (index, value) {
            if (value.type == 1) {
                dnum += value.num;
            }
            if (value.type == 2) {
                snum += value.num;
            }
        });
        drinknum.html(dnum);
        snacksnum.html(snum);

        //已选
        randeryixuan(chooselist.slice(0, 3));
    });

    /////////////////////////////////////////////////////////////////减少数量
    $('.list').on('click', '.jian', function () {
        var goods = JSON.parse($(this).parents('li').attr("data")); //获取每个li的商品信息
        var panduan = chooselist.filter(function (element) {
            return element.sid == goods.sid;
        });
        if (panduan.length >= 1) {
            panduan[0].num--; //解决问题：就是点击添加的时候数字不会消失

            if (!panduan[0].num) {

                chooselist = chooselist.filter(function (ele) {
                    return ele.sid != goods.sid;
                });
            }
            $(this).next().html(panduan[0].num);
        }

        //总价
        var totalnum = $('.totalnum');
        totalnum.html(randerzongjia(chooselist));

        /////////////遍历chooselist数组，当type=1时，给酒水的数量++；当type=2时，给零食的数量++
        //各自
        var drinknum = $('.drinknum');
        var dnum = 0;
        var snacksnum = $('.snacksnum');
        var snum = 0;
        $.each(chooselist, function (index, value) {
            if (value.type == 1) {
                dnum += value.num;
            }
            if (value.type == 2) {
                snum += value.num;
            }
        });
        drinknum.html(dnum);
        snacksnum.html(snum);

        //已选
        randeryixuan(chooselist.slice(0, 3));
    });

    //////////////////////////////////////////////////////////////////选好了
    var xuanhao = $('.xuanhao');
    xuanhao.on('click', function (e) {
        e.preventDefault(); //阻止a标签的默认行为
        localStorage.setItem('shop', JSON.stringify(chooselist));
        location.href = '/KTV/index.php/shop/xuanhao';
    });

    ///////////////////////////////////////////////////////////////////总价
    function randerzongjia(data) {
        var tnum = 0;
        $.each(data, function (index, value) {
            var p = value.price.substr(0, 1);
            // console.log(p);//单价:9
            tnum += value.num * p;
        });
        return tnum.toFixed(2); //toFixed(2)保留两位小数
    }
    ///////////////////////////////////////////////////////////////////已选
    function randeryixuan(data) {
        $('.yixuanlist').empty();
        $.each(data, function (index, value) {
            $('.yixuanlist').html(function (index, ele) {
                ele += $('<div>').html(value.sname + '&nbsp;' + value.num).appendTo($('.yixuanlist'));
            });
        });
        if ($('.yixuanlist>div').length >= 3) {
            $('.more').addClass('active');
        }
    }

    ///////////////////////////////////////////////////////////////////商店页面，把从数据库获取的东西放到页面
    function rander(obj, data) {
        obj.empty();
        var str = '';
        $.each(data, function (index, value) {
            obj.html(
            // console.log(index)
            str += '\n                \n                    <li data=\'' + JSON.stringify(data[index]) + '\' class="lis">\n                    <!--\u901A\u8FC7data\u628A\u6BCF\u4E2Ali\u7684\u4FE1\u606F\u90FD\u7ED1\u5230li\u4E0A\uFF0C\u53C8\u56E0\u4E3A\u672C\u8EAB\u662F\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u6240\u4EE5\u8981\u8F6C\u6362\u4E3A\u5B57\u7B26\u4E32-->\n                        <div class="list-box">\n                            <div class="left">\n                                <img src="' + value['images'] + '" alt="">\n                            </div>\n                            <div class="right">\n                                <div class="sname">' + value['sname'] + '&nbsp;&nbsp;&nbsp;&nbsp;\n                                    ' + randerHot(value['hot']) + '\n                                </div>\n                                <div class="price">\uFFE5<span>' + value['price'] + '</span></div>\n                                <div class="count">\n                                    <div class="jian">-</div>\n                                    <div class="shu">0</div>\n                                    <div class="jia">+</div>\n                                </div>\n                            </div>\n                        </div>\n                    </li>\n                \n                ');
        });
        myScroll.refresh();
        function randerHot(num) {
            var str = '';
            for (var i = 0; i < num; i++) {
                str += '\n                <img src="/KTV/Public/img/sd20.png" alt="">\n            ';
            }
            return str;
        }
    }
}
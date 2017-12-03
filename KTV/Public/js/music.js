'use strict';

function loaded() {
    var main = $('.main');
    ///////////////////////////////////////////////////////////iscroll
    //提供一种原生的方式来支持在一个固定高度的容器内滚动内容
    var myScroll = void 0;
    myScroll = new IScroll('.wrapper', {
        click: true //配置项
    });

    ///////////////////////////////////////////////////////////获取数据到页面
    $.ajax({
        url: '/KTV/index.php/music/query',
        dataType: 'json',
        success: function success(data) {
            rander(main, data);
        }
    });

    /////////////////////////////////////////////////////////rander
    function rander(obj, data) {
        obj.empty();
        var str = '';
        obj.html(
        // console.log(index)
        str += '\n                \n                <a href="/KTV/index.php/music/select?type=' + data[0]['fid'] + '" class="main-top singer">\n                    <div class="title1">' + data[0]['ftitle'] + '</div>\n                    <img src="' + data[0]['images'] + '" alt="">\n                </a>\n                <ul class="main-center">\n                    <a href="/KTV/index.php/music/select?type=' + data[1]['fid'] + '">\n                        <li class="singer">\n                            <div class="title1 title2">' + data[1]['ftitle'] + '</div>\n                            <img src="' + data[1]['images'] + '" alt="">\n                        </li>\n                    </a>\n                    <a href="/KTV/index.php/music/select?type=' + data[2]['fid'] + '">\n                        <li class="singer">\n                            <div class="title1 title2">' + data[2]['ftitle'] + '</div>\n                            <img src="' + data[2]['images'] + '" alt="">\n                        </li>\n                    </a>\n                    <a href="/KTV/index.php/music/select?type=' + data[3]['fid'] + '">\n                        <li class="singer">\n                            <div class="title1 title2">' + data[3]['ftitle'] + '</div>\n                            <img src="' + data[3]['images'] + '" alt="">\n                        </li>\n                    </a>\n                </ul>\n                <ul class="main-bottom">\n                    <a href="/KTV/index.php/music/select?type=' + data[4]['fid'] + '">\n                        <li class="singer">\n                            <div class="title1 title3">' + data[4]['ftitle'] + '</div>\n                            <img src="' + data[4]['images'] + '" alt="">\n                        </li>\n                    </a>\n                    <a href="/KTV/index.php/music/select?type=' + data[5]['fid'] + '">\n                        <li class="singer">\n                            <div class="title1 title3"><span>-</span>' + data[5]['ftitle'] + '<span>-</span></div>\n                            <img src="' + data[5]['images'] + '" alt="">\n                        </li>\n                    </a>\n                </ul>\n                \n                ');
        myScroll.refresh();
    }
}
'use strict';

function loaded() {
    ///////////////////////////////////////////////////////////iscroll
    //提供一种原生的方式来支持在一个固定高度的容器内滚动内容
    var myScroll = void 0;
    myScroll = new IScroll('.wrapper', {
        click: true //配置项
    });

    /////////////////////////////////////////////////////////从本地获取全部歌曲的信息
    var playlist = JSON.parse(localStorage.getItem('songs'));
    // let playlist=[];
    var singertype = location.search.split('=')[1];
    console.log(playlist);

    /////////////////////////////////////////////////////////把本地的内容放到收藏页面
    var main = $('.main');
    $.ajax({
        url: '/KTV/index.php/music/recommend_xq',
        data: { singertype: singertype },
        success: function success(data) {
            rander(main, playlist); //把内容添加到ul中
            myScroll = new IScroll('.wrapper'); //添加上之后，再获取一下
        }
    });

    /////////////////////////////////////////////////////////置顶
    main.on('click', '.top', function (e) {
        e.preventDefault();
        var id = $(this).parents('li').attr('id');
        var del = playlist.filter(function (ele) {
            return ele['oid'] == id;
        })[0]; //把要置顶的选中
        playlist = playlist.filter(function (ele) {
            return ele['oid'] != id;
        }); //筛选出除了当前要置顶的歌曲以外的其他歌曲
        playlist.unshift(del); //把选中的置顶歌曲再放到数组的最前面Unshift()
        localStorage.setItem('songs', JSON.stringify(playlist));
        rander(main, playlist);
        myScroll = new IScroll('.wrapper', {
            click: true //配置项
        });
    });
    //////////////////////////////////////////////////////////删除
    main.on('click', '.del', function (e) {
        e.preventDefault();
        var id = $(this).parents('li').attr('id');
        playlist = playlist.filter(function (ele) {
            return ele['oid'] != id;
        });
        localStorage.setItem('songs', JSON.stringify(playlist));
        rander(main, playlist);
        myScroll = new IScroll('.wrapper', {
            click: true //配置项
        });
    });

    ////////////////////////////////////////////////////////rander
    function rander(obj, data) {
        /*if(localStorage.songs){
            playlist=JSON.parse(localStorage.songs);
        }*/
        $('.change').html('\u5171' + playlist.length + '\u9996');
        var str = '';
        obj.empty();
        $.each(data, function (index, value) {
            console.log(value);
            // $('.nav>p').html(`${value['name']}`);
            obj.html(str += '\n                    <a href="">\n                        <li id="' + value.singertype + '" >\n                             <div class="left">\n                                 <div class="left-one"></div>\n                                 <div class="left-two">\n                                     <img src="' + value.img + '" alt="">\n                                 </div>\n                             </div>\n                             <div class="geming">\n                                 <p>' + value.oname + '</p>\n                                 <p>04"25\'</p>\n                             </div>\n                            \n                         </li>\n                    </a>\n                ');
        });
    }
}
'use strict';

function loaded() {

    ///////////////////////////////////////////////////////////iscroll
    //提供一种原生的方式来支持在一个固定高度的容器内滚动内容
    var myScroll = void 0;
    myScroll = new IScroll('.wrapper', {
        click: true //配置项
    });

    /////////////////////////////////////////////////////////////////////歌手类型页面数据从后台获取
    /* let main=$('.main');
     let type=location.search.slice(-1);//获取到type值
     $.ajax({
         url:'/KTV/index.php/music/select',
         data:{type},
         dataType:'json',
         success:function(data){
             console.log(data)
             // location.href = '/KTV/index.php/music/singer';
             randersinger(main,data);
         }
     })
    */

    ////////////////////////////////////////////////////////////////////搜索
    var lis = $('.main>li');
    $('input').on('keyup', function () {
        ///////搜索框
        var value = $(this).val().trim();
        var pyarr = [];
        var all = {};
        $.each(lis, function (index, value) {
            var attr = $(value).attr('dataall').split(',');
            all = { pinyin: attr[5], name: attr[3], img: attr[2], sid: attr[0],
                stype: attr[1], sname: attr[3], Dcounts: attr[4] };
            pyarr.push(all);
        });
        // console.log(pyarr);//获取到所有的拼音和名字
        var data = pyarr.filter(function (element) {
            return element.pinyin.includes(value) || element.name.includes(value);
        });
        // console.log(data);//筛选过后的
        render(data);
    });
    //////////////////在搜索之前先排序
    var pyall = [];
    var all1 = {};
    $.each(lis, function (index, value) {
        var attr = $(value).attr('dataall').split(',');
        all1 = { pinyin: attr[5], name: attr[3], img: attr[2], sid: attr[0],
            stype: attr[1], sname: attr[3], Dcounts: attr[4] };
        pyall.push(all1);
    });
    // console.log(pyall)
    render(pyall);

    /////////////////////////////////////////////////////////////按照获取的内容进行排序
    function render(PersonInfo) {
        var obj = {};
        PersonInfo.forEach(function (element) {
            ////////json对象
            var Cases = element.pinyin.charAt(0).toUpperCase();
            if (!obj[Cases]) {
                obj[Cases] = []; //////////////////////////把属性值设为空数组
            }
            obj[Cases].push(element);
        });

        var Arr = Object.keys(obj).sort(); ///获取obj的全部属性并且进行排序
        $('.main').html("");
        Arr.forEach(function (element) {
            obj[element].forEach(function (value) {
                ///////[]
                $('.main').html(function (index, val) {
                    // console.log(value);
                    return val += '\n                        <li dataall=\'' + JSON.stringify(value) + '\'>\n                            <a href="/KTV/index.php/music/songs?sid=' + value.sid + '\n                                    &&type=' + value.stype + '">\n                                <img src="' + value.img + '" alt="">\n                                ' + value.name + ' (' + value.Dcounts + ')\n                            </a>\n                        </li>\n                ';
                });
                // ul.innerHTML+=`<li><a href=${value.phone}>${value.name}</a></li>`;//把名字添加到页面
            });
        });
    }

    ///////////////////////////////////////////////////////////////////歌手页面，把从数据库获取的东西放到页面
    function randersinger(obj, data) {
        obj.empty();
        var str = '';
        $.each(data, function (index, value) {
            obj.html(
            // console.log(index)
            str += '\n\n                    <li class="">\n                        <a href="/KTV/index.php/music/songs?type=' + data[$i]['sid'] + '">\n                            <img src="' + value['images'] + '" alt="">\n                            ' + value['sname'] + ' (' + value['Dcounts'] + ')\n                        </a>                       \n                    </li>\n\n                ');
        });
    }
}
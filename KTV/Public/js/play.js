'use strict';

function loaded() {
    ///////////////////////////////////////////////////////////iscroll
    //提供一种原生的方式来支持在一个固定高度的容器内滚动内容
    var myScroll = void 0;
    myScroll = new IScroll('.wrapper', {
        click: true //配置项
    });

    var ul = $('.ci');
    var audio = $('audio');
    var songs = JSON.parse(localStorage.songs);

    ///////////////////////////////////////////////////////////取歌曲的singertype
    var sid = location.search.split('=')[1];
    var index = 0;
    for (var i = 0; i < songs.length; i++) {
        if (songs[i]['singertype'] == sid) {
            index = i; //先获取到要播放歌曲的singertype，再通过singertype找到要播放的歌曲
        }
    }

    ////////////////////////////////////////////////////////////获取到歌词
    var geAll = []; //用来存放时间和歌词////0:{time: "00:12", geci: "나 나나나 난난나나나나"}
    var geciarr = [];
    quci(index);
    function quci(index) {
        ul.empty();
        $('.p').html('' + songs[index].oname);
        $('.dtime').html('' + songs[index].time);
        audio.attr('src', '' + songs[index]['music']); //给audio设置src
        $.ajax({
            url: '/KTV/Public/json/' + songs[index].oname + '.json',
            success: function success(data) {
                var geci = '';
                var ci = data.lrc.lyric.split('\n'); //歌词
                geAll=[];
                $.each(ci, function (i, val) {
                    var time = val.substr(1, 5);
                    geci = val.slice(val.indexOf(']') + 1);
                    geAll.push({ time: time, geci: geci });
                });
                geciarr=[];
                $.each(geAll, function (index, val) {
                    geciarr.push(val.geci);
                });
                ul.html(rander(geciarr)); //把歌词添加到页面
                myScroll = new IScroll('.wrapper', {
                    click: true //配置项
                });
            }
        });
    }

    /////////////////////////////////////////////////////////////开关
    var Switch = $('.bofang>i');
    Switch.on('click', function () {
        $('.bofang>i').toggleClass('active');
        if (audio[0].paused) {
            audio[0].play();
        } else {
            audio[0].pause();
        }
    });

    /////////////////////////////////////////////////////////////上一首、下一首
    var shang = $('.shang');
    var xia = $('.xia');
    var a = 0;
    shang.on('click', function () {
        audio[0].pause();
        if ($('.bofang>.icon-stop').hasClass('active')) {
            $('.bofang>i').toggleClass('active');
        }
        a = index - 1;
        if (a <= 0) {
            a = 0;
        }
        quci(a);
    });
    var b = 0;
    xia.on('click', function () {
        audio[0].pause();
        if ($('.bofang>.icon-stop').hasClass('active')) {
            $('.bofang>i').toggleClass('active');
        }
        /*b = songs.slice(index + 1);
        if (b.length == 0) {
            return;
        }*/
        b = index + 1;
        if (b >= songs.length) {
            b = songs.length-1;
        }
        // location.href=`/KTV/index.php/music/play?singertype=${b[0]['singertype']}`;
        console.log(b)
        quci(b);
    });

    /////////////////////////////////////////////////////////////歌词同步
    audio[0].ontimeupdate = function () {
        // let current=this.currentTime;
        // console.log(typeof current);//秒number
        var ct = Time(this.currentTime); //当前播放的时间00:00
        var dt = Time(this.duration); //总的播放的时间00:00
        $('.jindu').css({ width: this.currentTime / this.duration * 100 + '%' });
        $('.ctime').html('' + ct);
        $.each(geAll, function (index, value) {
            if (ct == value.time) {
                var _a = index;
                if (index <= 3) {
                    index = 0;
                }
                if (index > 3) {
                    index = index;
                }
                ul.empty();
                var str = '';
                for (var _i = index; _i < geAll.length; _i++) {
                    //index代表当前播放的歌词的下标
                    str += '\n                        <li class="lis' + _i + '">' + geAll[_i].geci + '</li>\n                    ';
                    ul.html(str);
                }
                $('.lis' + _a).css({ color: '#550589' });
            }
        });
        if (ct == dt) {
            audio[0].pause();
            $('.bofang>i').toggleClass('active');
            quci(index);
            $('.jindu').css({ width: 0 });
        }
    };

    ///////////////////////////////////////////////////////////格式化时间
    function Time(time) {
        var minutes = Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60);
        var seconds = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60);
        return minutes + ':' + seconds;
    }

    ///////////////////////////////////////////////////////////rander
    function rander(data) {
        var str = '';
        $.each(data, function (index, value) {
            // console.log(value)
            str += '\n                    <li class="lis' + index + '">' + value + '</li>\n                ';
        });
        return str;
    }
}
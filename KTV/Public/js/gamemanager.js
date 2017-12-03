'use strict';

$(function () {

    var tbody = $('tbody');
    ////////////////没有的话给一个默认值
    if (!location.hash) {
        location.hash = '#list';
    }
    ////////////////用hash设置选项卡
    $(window).on('hashchange', function () {
        $('#Mytab>li').removeClass('active');
        $('.tab_pane').removeClass('active');
        $(location.hash).parent('li').addClass('active');
        $(location.hash + '-tab').addClass('active');
        //////////////////////////////////////////////////////////////////////查看表
        if (location.hash == '#list') {
            $.ajax({
                url: '/KTV/index.php/gamemanager/show', //发送数据
                dataType: 'json',
                success: function success(data) {
                    //接受php传过来的数据，是一个json对象
                    rander(data);
                    /*console.log(data);//[{gid: "1", gname: "真心话1", type: "1"},
                                      //{gid: "2", gname: "真心话2", type: "1"}]
                    */
                }
            });
        }
    });
    $(window).triggerHandler('hashchange'); //在页面开始时就要执行window的hashchange事件
    //////////////////////////////////////////////////////////////////////插入表
    var sub = $('.submit');
    var form = $('form');
    sub.on('click', function () {
        var data = form.serialize();
        // console.log(data);//gname=&type=
        $.ajax({
            url: '/KTV/index.php/gamemanager/insert',
            data: data,
            success: function success(data1) {
                if (data1 == 'ok') {
                    location.href = location.pathname + '#list';
                } else if (data1 == 'error') {
                    alert('插入失败');
                }
            }
        });
    });
    /////////////////////////////////////////////////////////////////////删除
    ///////通过js动态创建的元素，要添加事件，就要用事件委派
    tbody.on('click', '.btn', function () {
        // console.log(this);//btn
        var id = $(this).parents('tr').attr('id');
        var that = this;
        $.ajax({
            url: '/KTV/index.php/gamemanager/delete',
            data: { id: id }, ///////////?????????????
            success: function success(data) {
                if (data == 'ok') {
                    $(that).closest('tr').remove(); ///this指向一个空对象，所以在外面把this给了that
                } else if (data == 'error') {
                    alert('删除失败');
                }
            }
        });
    });
    /////////////////////////////////////////////////////////////////更新
    ///////当input失去焦点时，保存，又因为input是js动态地创建出来的，所以要用事件委派
    tbody.on('blur', 'input', function () {
        var newval = $(this).val();
        var type = $(this).attr('type'); //哪个失去焦点，就获取的哪个的type值，
        // 又因为type值和字段名一样，所以修改的时候字段名用type充当
        var id = $(this).parents('tr').attr('id');
        $.ajax({
            url: '/KTV/index.php/gamemanager/update',
            data: { id: id, type: type, newval: newval },
            success: function success(data) {
                if (data == 'ok') {
                    alert('更新成功');
                    // location.href=location.pathname+'#list';
                } else if (data == 'error') {
                    alert('更新失败');
                }
            }
        });
    });

    ////////在页面中动态的创建元素
    function rander(data) {
        tbody.empty(); //再添加之前先清空
        var str = '';
        $.each(data, function (index, value) {
            str += '\n                <tr id="' + value['gid'] + '">\n                    <td style="text-align: center" type="gid">' + value["gid"] + '</td>\n                    <td type="">\n                        <input type="gname" value="' + value["gname"] + '">\n                    </td>\n                    <td type="">\n                        <input type="type" value="' + value["type"] + '">\n                    </td>\n                    <td style="text-align: center">\n                        <botton class="btn btn-info" style="background: #272924;border-color: #272924;">\u5220\u9664</botton>\n                    </td>\n                </tr>\n            ';
        });
        return tbody.html(str);
        myScroll.refresh();
    }
});
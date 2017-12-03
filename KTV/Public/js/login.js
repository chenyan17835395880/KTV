'use strict';

$(function () {

    var user = $('#user');
    var pass = $('#pass');
    var sub = $('.onclick');

    ///////////////////////////验证
    var regu = /^\s+|\s+$/g;
    // let flagu=false,flagp=false;
    $('input').on('blur', function () {
        var e = $(this);
        var value = e.val().trim(); //去空，相当于let value=$(this).val().trim()
        if (e.attr('data-validata')) {
            var validata = e.attr('data-validata').split(';'); //类型和提示
            var flag = true;
            for (var i = 0; i < validata.length; i++) {
                var arr = validata[i].split(':'); //类型：arr[0]   提示：arr[1]
                if (!validataType(value, arr[0])) {
                    // console.log(validataType(value,arr[0]))
                    e.next('.form-help').remove();
                    $('<div>').addClass('form-help').html(arr[1]).insertAfter(this);
                    flag = false;
                    break;
                }
                // console.log(validataType(value,arr[0]))
            }
            if (flag) {
                e.next('.form-help').remove();
            }
        }
    });
    function validataType(value, tips) {
        switch (tips) {
            case 'require':
                // return !!value.length;
                return (/[^(^\s*\s*$)]/.test(value)
                );
                break;
            case 'username':
                return (/^[a-zA-Z]{5,8}$/.test(value)
                );
                break;
            case 'password':
                return (/^\w{5,8}$/.test(value)
                );
                break;
            case 'qq':
                return (/^1-9\d{4,9}$/.test(value)
                );
                break;
        }
    }

    //////////////////////////////////提交
    sub.on('click', function () {
        $('input').trigger('blur');
        if ($('form').find('.form-help').length) {
            return;
        }
        var data = { name: user.val(), pass: pass.val() };
        /*console.log(data);
        * {name: "", pass: ""}
        * */
        // let data=form.serializeArray();
        /*
        * [
        * {name:"user",value:"admin"}
        * {name:"pass",value:"1234"}
        * ]
        * */
        // let data=form.serialize();
        $.ajax({
            url: '/KTV/index.php/login/check', //发送的请求
            data: data,
            method: 'get',
            success: function success(data) {
                if (data == 'ok') {
                    location.href = '/KTV/index.php/gamemanager';
                } else {
                    alert('登录失败');
                }
            }
        });
        return false; //清除submit默认行为
    });
});
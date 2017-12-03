'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
                url: '/KTV/index.php/shopmanager/show', //发送数据
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
        // let data=new FormData(form[0]);
        /*console.log(data)//FormData {}
                        // __proto__: FormData*/
        $.ajax({
            url: '/KTV/index.php/shopmanager/insert',
            type: 'post',
            data: data,
            success: function success(data) {
                if (data == "ok") {
                    location.href = location.pathname + "#list";
                } else if (data == 'error') {
                    alert('插入失败');
                }
            }
        });
    });
    ///////////////////////////////////////////////////////////////////////上传图片
    var image = document.querySelector('#image');
    var thumb = document.querySelector('#thumb');
    var imgtype = ['png', 'jpeg', 'gif', 'jpg'];
    var size = 5 * 1024 * 1024; //KB-B-M
    image.onchange = function () {
        //单文件上传
        /* /!*console.log(this.files);*!/
         let data=this.files[0];//上传的文件
         let reader=new FileReader();//把上传的文件读进来
         reader.readAsDataURL(data);//用这种格式把它读进来
         reader.onload=function(e){
             thumb.src=e.target.result;//存的是一个图片的数据
             let formdata=new FormData();
             formdata.append('file',data);//属性为file,值为data
             let xml=new XMLHttpRequest();
             xml.open('post','/KTV/index.php/shopmanager/upload',true);
             xml.upload.onprogress=function(e){//进度条
                 // console.log(e)
             }
             xml.send(formdata);
             xml.onload=function(){
                 // console.log(xml.response);///KTV/Public/upload/banner1.png 用来接收php输出的值*!/
                 $(':hidden').val(xml.response);
             }
         }*/
        //多文件上传
        //  console.log(this.files);
        [].concat(_toConsumableArray(this.files)).forEach(function (element, index) {
            // console.log(element)
            if (element.size >= size && !imgtype.includes(element.type.split('/')[1])) {
                alert('请检查图片大小或类型');
                return;
            }
            var reader = new FileReader();
            reader.readAsDataURL(element);
            reader.onload = function (e) {
                var imgs = new Image();
                imgs.style.width = '100px';
                imgs.src = e.target.result;
                $('.imgs').append(imgs);
                var xml = new XMLHttpRequest();
                var formdata = new FormData();
                formdata.append('file', element);
                xml.open('post', '/KTV/index.php/shopmanager/upload', true);
                xml.upload.onprogress = function (e) {
                    //进度条
                    console.log(document.querySelector('.progress-bar'));
                    document.querySelector('.progress-bar').style.width = '${(e.loaded/e.total)*100}%';
                };
                xml.send(formdata);
                xml.onload = function () {
                    // console.log(xml.response);///KTV/Public/upload/banner1.png 用来接收php输出的值*!/
                    $(':hidden').val(function (index, value) {
                        return value += xml.response;
                    });
                    // $(':hidden').val().substr(0,-1);
                };
            };
        });
    };
    /////////////////////////////////////////////////////////////////////删除
    ///////通过js动态创建的元素，要添加事件，就要用事件委派
    tbody.on('click', '.btn', function () {
        // console.log(this);//btn
        var id = $(this).parents('tr').attr('id');
        var that = this;
        $.ajax({
            url: '/KTV/index.php/shopmanager/delete',
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
            url: '/KTV/index.php/shopmanager/update',
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
            str += '\n                <tr id="' + value['sid'] + '">\n                    <td style="text-align: center" type="sid">' + value["sid"] + '</td>\n                    <td type="">\n                        <input type="type" value="' + value["type"] + '">\n                    </td>\n                    <td type="">\n                        <input type="sname" value="' + value["sname"] + '">\n                    </td>\n                    <td type="">\n                        <input type="hot" value="' + value["hot"] + '">\n                    </td>\n                    <td type="">\n                        <input type="price" value="' + value["price"] + '">\n                    </td>\n                    <td type="">\n                        <input type="description" value="' + value["description"] + '">\n                    </td>\n                    <td type="">\n                        <input type="srl" value="' + value["srl"] + '">\n                    </td>\n                    <td type="">\n                        <img src="' + value["images"] + '" alt="" width="80">    \n                    </td>\n                    <td style="text-align: center">\n                        <botton class="btn btn-info" style="background: #272924;border-color: #272924;">\u5220\u9664</botton>\n                    </td>\n                </tr>\n            ';
        });
        return tbody.html(str);
    }
});
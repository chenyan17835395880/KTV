<?php

class songsmanager{
    function __construct()
    {
        $obj=new db();
        $this->mysql=$obj->mysql;
    }
    function index(){
        $title="音乐管理";
        include 'App/views/songsmanager.html';
    }
    function show(){
        $data=$this->mysql->query("select * from `songs`")->fetch_all(1);
        echo json_encode($data);//json_encode()把关联数组转化为json对象，因为php接受的数据类型为json
    }
    function insert(){
        /* $sname=$_REQUEST['sname'];
         $hot=$_REQUEST['hot'];
         $price=$_REQUEST['price'];
         $description=$_REQUEST['description'];
         $srl=$_REQUEST['srl'];
         $type=$_REQUEST['type'];*/

        $data=$_POST;
        $str='(';
        $keys=array_keys($data);
        /*        var_dump( $data);*/
        for($i=0;$i<count($keys);$i++){
            $str.="{$keys[$i]},";//每个字段后面都有一个,
        }
        $strs=substr($str,0,-1);
        $strs.=') values (';
        foreach($data as $v){
            $strs.="'{$v}',";
        }
        $strs=substr($strs,0,-1);
        $strs.=")";



        /*$data1=$this->mysql->query("insert into shop (type,sname,hot,price,description,srl)
  values ('{$type}','{$sname}','{$hot}','{$price}','{$description}','{$srl}')");*/
        $this->mysql->query("insert into `songs` $strs");
//        echo ("insert into `shop` $strs");
        if($this->mysql->affected_rows){
            echo "ok";
        }else{
            echo 'error';
        }
    }
    function upload(){
        /*var_dump($_FILES);
        array (size=1)  'file' => array (size=5) 'name' => string 'banner1.png' (length=11)
                                                 'type' => string 'image/png' (length=9)
                                                 'tmp_name' => string 'G:\wamp\tmp\php342E.tmp' (length=23)
                                                 'error' => int 0      'size' => int 303816*/
        if(is_uploaded_file($_FILES['file']['tmp_name'])){//看的是formdata.append('file',data);属性为file,值为data
            if(!file_exists('Public/upload')){
                mkdir('Public/upload');
            }
            $path='Public/upload/'.$_FILES['file']['name'];
            move_uploaded_file($_FILES['file']['tmp_name'],$path);//tmp_name:存储在服务器的文件的临时副本的名称
            $src='/KTV/'.$path;
            echo $src;
        }
    }
    function delete(){
        $id=$_REQUEST['id'];
        $data=$this->mysql->query("delete from `songs` where oid=$id");
        if($this->mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    function update(){
        $id=$_REQUEST['id'];
        $newval=$_REQUEST['newval'];
        $type=$_REQUEST['type'];
        $data=$this->mysql->query("update `songs` set $type='{$newval}' where oid=$id");
        if($this->mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    ///////上传到数据库中
    function uploadM(){
        $file=$_FILES['file'];//接受数据
        if (is_uploaded_file($_FILES['file']['tmp_name'])) {///判断是否有服务器临时文件
            $path = 'Public/music/'. date('y-m-d');/////日期文件夹的路径
            if (!file_exists($path)) {////看是否存在日期的文件夹
                mkdir($path);
            }
        }
        $musicpath = $path . '/' . $file['name'];
        move_uploaded_file($file['tmp_name'], $musicpath);/////移动文件，把谁移到哪
        $src='/KTV/'.$musicpath;
        echo $src;
    }
}
<?php

class gamemanager{
    function __construct()
    {
        $obj=new db();
        $this->mysql=$obj->mysql;
    }
   function index(){
        $title='游戏管理';
        include 'App/views/gamemanager.html';//相对路径
   }
   function show(){
       $data=$this->mysql->query("select * from game")->fetch_all(1);
       echo json_encode($data);//json_encode()把关联数组转化为json对象，因为php接受的数据类型为json
   }
   function insert(){
       $gname=$_REQUEST['gname'];
       $type=$_REQUEST['type'];
       $data1=$this->mysql->query("insert into game (gname,type) values ('{$gname}','{$type}')");
       if($this->mysql->affected_rows){
           echo 'ok';
       }else{
           echo 'error';
       }
   }
   function delete(){
       $id=$_REQUEST['id'];
       $data=$this->mysql->query("delete from game where gid=$id");
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
       $data=$this->mysql->query("update game set $type='{$newval}' where gid=$id");
       if($this->mysql->affected_rows){
           echo 'ok';
       }else{
           echo 'error';
       }
   }
}


?>
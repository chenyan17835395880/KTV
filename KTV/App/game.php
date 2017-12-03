<?php
 class game{
     function __construct()
     {
         $obj=new db();
         $this->mysql=$obj->mysql;
     }
     function index(){
         $data=$this->mysql->query("select * from gametype")->fetch_all(1);
         include 'App/views/game.html';
     }
     function select(){
         $type=$_REQUEST['type'];
         $data=$this->mysql->query("select * from game where type='{$type}' limit 0,3")->fetch_all(1);
         include 'App/views/gamelist.html';
     }
     function change(){
         $type=$_GET['type'];
         $page=$_GET['page'];
         $num=3;//每次取的个数
         $offset=($page-1)*$num;//每次截取的位置
         $data=$this->mysql->query("select * from game where type='{$type}' limit $offset,$num")->fetch_all(MYSQL_ASSOC);
         echo json_encode($data);
     }
 }

?>
<?php

class login{
    function __construct()
    {
        $obj=new db();
        $this->mysql=$obj->mysql;
    }
    function index(){
        include 'views/login.html';
    }
    function check(){
        $user=$_GET['name'];
        $pass=$_GET['pass'];
        $data=$this->mysql->query("select * from `admin` where user='{$user}'")->fetch_all(1);
        for($i=0;$i<count($data);$i++){
            if($data[$i]['pass']==$pass){
                echo 'ok';//相当于return
                exit;
            }else{
                echo 'error';
            }
        }
    }
}
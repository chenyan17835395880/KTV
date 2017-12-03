<?php

class db{
    public $mysql;
    function __construct()
    {
        $this->sql();
    }
    function sql(){
        header("Content-type:text/html;charset=utf8");
        $this->mysql=new mysqli('sqld.duapp.com','4155d3453768449bafb0ebcdff76acf6','a1365dda45764b0493b3ad97d1dc6bd0','yeasTOqeunADmFBPjMFf',4050);
        $this->mysql->query('set names utf8');
        if($this->mysql->connect_errno){
            echo '数据库连接失败，失败信息'.$this->mysql->connect_errno;
            exit;
        }
    }
}
?>
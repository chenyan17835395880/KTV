<?php

class shop{
    function __construct()
    {
        $obj=new db();
        $this->mysql=$obj->mysql;
    }
    function index(){
        include 'App/views/shop.html';
    }
    function query(){
        $data=$this->mysql->query("select * from shop")->fetch_all(1);
        echo json_encode($data);
    }
    function xuanhao(){
        include 'App/views/shoplist.html';
    }
    function submit(){
        $order=$_GET['order'];

        /*订单表*/
        $sql=$this->mysql->query("insert into orders (user,status) values ('CHEN',0)");
        $oid=$this->mysql->insert_id;//找到当前上一步 INSERT 查询中产生的 AUTO_INCREMENT 的 ID 号，即oid
        $this->mysql->autocommit(false);//不会进行自动提交，还可以进行更改，不加的话，自动提交query，不能更改
        $this->mysql->query($sql);//一进行query，自动插入，表就确定了，不能更改


        /*订单详情表*/
        $str='(';
        for($i=0;$i<count($order);$i++){
            forEach($order[$i] as $v){
                $str.=$v.',';
            }
            $str.=$oid.'),(';//在values中把oid加上
        }
        $str=substr($str,0,-2);
        $sql=$this->mysql->query("insert into `orderextra` (`sid`,`count`,`total`,`oid`) values $str");
        if($this->mysql->affected_rows){
            $this->mysql->commit();//等两个表都执行成功之后，再提交
            echo 'ok';
            exit;
        }else{
            $this->mysql->rollback();//回滚，之前的操作会再执行一次
            echo 'error';
        }

        $this->mysql->autocommit(true);
    }
    function success(){
        include 'App/views/success.html';
    }
}
<?php

class music{
    function __construct()
    {
        $obj=new db();
        $this->mysql=$obj->mysql;
    }
    function home(){
        include 'App/views/home.html';
    }
    function index(){
        $data2=$this->mysql->query("select * from `singer`")->fetch_assoc();
        include 'App/views/music.html';
    }
    //歌手类型
    function query(){
        $data=$this->mysql->query("select * from `fen lei`")->fetch_all(1);
        echo json_encode($data);
    }
    //歌手详情
    function select(){
        $type=$_REQUEST['type'];
        $data=$this->mysql->query("select * from `singer` where stype={$type}")->fetch_all(1);
        $data2=$this->mysql->query("select * from `singer`")->fetch_assoc();
        $data1=$this->mysql->query("select `ftitle` from `fen lei` where fid={$type}")->fetch_assoc();
        include 'App/views/singer.html';
    }
    //歌曲详情
    function songs(){
        $sid=$_REQUEST['sid'];
        $data=$this->mysql->query("select * from `singer` where sid={$sid}")->fetch_assoc();
        $type=$_REQUEST['type'];
        $data1=$this->mysql->query("select `ftitle` from `fen lei` where fid={$type}")->fetch_assoc();
        $data2=$this->mysql->query("select * from `songs` where singertype={$sid}")->fetch_all(1);
        $data3=$this->mysql->query("select * from `songs` where singertype={$sid}")->fetch_assoc();
        include 'App/views/songs.html';
    }
    //已点歌曲
    function Sorder(){
        $data3=$this->mysql->query("select * from `singer`")->fetch_assoc();
        $data2=$this->mysql->query("select * from `songs`")->fetch_assoc();
//        $singertype=$_REQUEST['singertype'];
        include 'App/views/Sorder.html';
    }
    function play(){
        include 'App/views/play.html';
    }
    function rank(){
        $data=$this->mysql->query("select * from `songs`")->fetch_all(1);
        $data2=$this->mysql->query("select * from `singer`")->fetch_all(1);
        $data3=$this->mysql->query("select * from `singer`")->fetch_assoc();
        include 'App/views/rank.html';
    }
    function recommend(){
        $data2=$this->mysql->query("select * from `singer`")->fetch_assoc();
        $data=$this->mysql->query("select * from `singer`")->fetch_all(1);
        $data1=$this->mysql->query("select * from `songs`")->fetch_assoc();
        include 'App/views/recommend.html';
    }
    function recommend_xq(){
        $data=$this->mysql->query("select * from `songs`")->fetch_assoc();
        include 'App/views/recommend_xq.html';
    }
}
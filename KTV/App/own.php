<?php
class own{
    function __construct()
    {
        $obj=new db();
        $this->mysql=$obj->mysql;
    }
    function index(){
        include 'App/views/own.html';
    }
}
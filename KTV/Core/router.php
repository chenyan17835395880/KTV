<?php

class router{

    static function run(){//全局的、局部的、静态的，加上static类似于构造函数的方法，用router::run()调用
        if(!isset($_SERVER['PATH_INFO']) || $_SERVER['PATH_INFO']=='/'){
            $model='login';
            $fn='index';
        }else{
            //$_SERVER['PATH_INFO']用来获取路径，如：'/game/add'
            $jiequ=substr($_SERVER['PATH_INFO'],'1');//把最前面的'/'截取掉，方便转化为['game','add'] 
            //['game','add']
            $pathinto=explode('/',$jiequ);//把字符串打散为数组
            $model=$pathinto[0];//把数组中的第一个设置为model
            $fn=isset($pathinto[1])?$pathinto[1]:'index';//判断数组中数组中是否存在第二个元素，
                                                       //有的话设置为功能，没有的话给他一个默认值
        }
        if(file_exists('App/'.$model.'.php')){//判断是否存在game.php或shop.php或其他，
                                                        //存在的话，把$model对应的php引进来，
                                                        //不存在的话，输出404
             include ('App/'.$model.'.php');
             if(class_exists($model)){//把相应的$model引进来之后，再判断是否存在相应的类，类名和$model的名字一样
                 $obj=new $model();
                 if(method_exists($obj,$fn)){//把相应的类引进来之后，再判断是否存在相应的功能方法
                     $obj->$fn();
                 }else{
                     include 'App/views/404.html';
                 }
             }else{
                 include 'App/views/404.html';
             }
        }else{
            include 'App/views/404.html';
        }
    }
}

?>
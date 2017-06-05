# hxc3-command

命令模式

## Install

[![hxc3-command](https://nodei.co/npm/hxc3-command.png)](https://npmjs.org/package/hxc3-command)

## Demo

安装：
    
    npm install

在dev环境运行：
    
    npm run dev

打开浏览器：

    http://127.0.0.1:8080/demo1/

命令模式可以实现对数据操作的撤销和重做。
    
[![pic](http://images2015.cnblogs.com/blog/702467/201706/702467-20170605203719981-822745053.jpg)](http://images2015.cnblogs.com/blog/702467/201706/702467-20170605203719981-822745053.jpg)

原理 
每次操作只记录操作的具体位置的变动， 而不是把整份数据做操作前后的备份。

例如
如果要删除表格第一行，第一列的数据， 只需要缓存住 内容变动的位置， 内容变动前后的数据。 这样撤销时，仍能根据这三个参数返回。




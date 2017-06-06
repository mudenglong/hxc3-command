# hxc3-command

redo undo 

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]


[npm-image]: http://img.shields.io/npm/v/hxc3-command.svg?style=flat-square
[npm-url]: http://npmjs.org/package/hxc3-command
[travis-image]: https://img.shields.io/travis/react-component/menu.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/menu
[coveralls-image]: https://img.shields.io/coveralls/react-component/menu.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/menu?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/menu.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/menu
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/hxc3-command.svg?style=flat-square
[download-url]: https://npmjs.org/package/hxc3-command


## Install

[![hxc3-command](https://nodei.co/npm/hxc3-command.png)](https://npmjs.org/package/hxc3-command)

## Screenshot

[![pic](http://images2015.cnblogs.com/blog/702467/201706/702467-20170605203719981-822745053.jpg)](http://images2015.cnblogs.com/blog/702467/201706/702467-20170605203719981-822745053.jpg)

## Demo

### Development：
```js
npm install
npm run dev
```

### open browser：

```js
http://127.0.0.1:8080/demo1/    
```

原理 
每次操作只记录操作的具体位置的变动， 而不是把整份数据做操作前后的备份。

例如
如果要删除表格第一行，第一列的数据， 只需要缓存住 内容变动的位置， 内容变动前后的数据。 这样撤销时，仍能根据这三个参数返回。

## Usage

step1: create a new "commonCommand.js" File in your project, e.g: `demo1/commonCommand.js`

step2: write a `pair` of functions, tips: the value of  `editCellContent` returned, will be the parameters of `editCellContentRollup`; 

commonCommand.js:

```js
var commonCommand = {
    /**
     * editOneCell
     * @param  {[type]} d [description]
     * @return {[type]}   [description]
     */
    editCellContent: function (d){
        var xpos = d[0];
        var ypos = d[1];
        var afterEditCon = d[2];
        var beforeEditCon = d[3];
        var data = d[4];
        var cbk = d[5];
        data[ypos][xpos] = afterEditCon;
        cbk('edit cell');
        return d;
    },
    editCellContentRollup: function (d){
        var xpos = d[0];
        var ypos = d[1];
        var afterEditCon = d[2];
        var beforeEditCon = d[3];
        var data = d[4];
        var cbk = d[5];
        data[ypos][xpos] = beforeEditCon;
        cbk('rollup edit cell');
        return d;
    }
}

```

step3: register a command before use, 注意 每个命令执行过以后， 传入的参数都是在缓存中的， 会一直存在直到程序退出，所以每条命令传入的参数务必控制大小。 如例子中虽然传入了`data`表格的全部数据，但因为数组是引用方式调用，所以该命令无论添加几次执行，缓存中还是那一个数组地址。

当然也可以在`cbk`回调函数再执行对`data`的修改

```js
// global
const hxc3 = {};

function registerCommand() {
    var command = new MacroCommand();
    hxc3.excelCommand = command;

    ////////////////////
    // redo undo 注册一下 //
    ////////////////////
    // edit cell
    command.action("editCellContent", commonCommand.editCellContent, commonCommand.editCellContentRollup);

    // delte cell
    command.action("editCol", commonCommand.editCol, commonCommand.editColRollup);

    // bind undo btn
    document.getElementById('menubtn_undo').onclick = function () {
        command.undo();
    };
    // bind redo btn
    document.getElementById('menubtn_redo').onclick = function () {
        command.redo();
    };
}

registerCommand();
```

step4: 调用

```js

// excute a command
document.getElementById('btn1').onclick = function () {
    // 数组对应的位置
    hxc3.excelCommand.do("editCellContent", [
        0,
        0,
        'data1first',
        '73.98', 
        data,
        function(msg){
            console.log(msg);
            // do something
        }
    ]);
}

```

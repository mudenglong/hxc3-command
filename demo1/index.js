import {commonCommand} from './commonCommand';
import MacroCommand from '../src/.';

const hxc3 = {}; 

const data = [
["73.98", "72.59", "72.20", "before", "20161123"]
,["72.14", "71.97", "70.35", "after", "20161125"]
,["75.58", "72.98", "72.50", "before", "20161128"]
,["74.50", "73.60", "71.99", "after", "20161129"]
,["81.06", "78.67", "72.98", "after", "20161130"]
,["78.67", "78.67", "76.80", "after", "20161201"]
,["80.94", "78.00", "77.49", "before", "20161202"]
,["80.87", "78.29", "76.25", "after", "20161205"]
,["78.87", "75.18", "75.00", "before", "20161206"]
,["75.80", "74.98", "73.70", "before", "20161207"]];

function renderATable(data){
	var trStartStr = "<tr>";
	var trEndStr = "</tr>";
	var tdstr = "", r = "", theadStr = "<thead><tr><th>data1</th><th>data2</th><th>data3</th><th>string1</th><th>date</th></tr><thead>";
	for (let i = 0; i < data.length; i++) {
		tdstr = "";
		for (let j = 0; j < data[i].length; j++) {
			tdstr += "<td>"+data[i][j]+"</td>";
		}
		r += trStartStr + tdstr + trEndStr;
	}

	var tableHtml = "<table border='1' cellspacing=0 cellpadding=0 >"+ theadStr  + "<tbody>" +r +"</tbody>" + "</table>";

	document.getElementById('content').innerHTML = tableHtml;
}

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

    // 绑定 按钮
	document.getElementById('menubtn_undo').onclick = function () {

        command.undo();
    };
	document.getElementById('menubtn_redo').onclick = function () {
        command.redo();
    };
}

// 渲染table, 注册需要用到的command命令
renderATable(data);
registerCommand();


// trigger command
document.getElementById('btn1').onclick = function () {
	// 数组对应的位置
	hxc3.excelCommand.do("editCellContent", [
		// mark modify data postion
		// 第0列 , 从0开始[0, 1, 2, ...]
	    0,
		// 第0行, 从0开始[0, 1, 2, ...]
	    0,
	    // new data
	    'data1first',
	    // last data
	    '73.98', 
	    data,
	    // after command callback
	    function(msg){
	    	console.log(msg);
			renderATable(data);
	    }
	]);
}

document.getElementById('btn2').onclick = function () {
	// 数组对应的位置
	hxc3.excelCommand.do("editCellContent", [
		// mark modify data postion
		// 第1列 , 从0开始[0, 1, 2, ...]
	    1,
		// 第9行, 从0开始[0, 1, 2, ...]
	    9,
	    // new data
	    'data2last',
	    // last data
	    '72.59', 
	    data,
	    // after command callback
	    function(msg){
	    	console.log(msg);
			renderATable(data);
	    }
	]);
}

document.getElementById('btn3').onclick = function () {

	// 数组对应的位置
	hxc3.excelCommand.do("editCol", [
		// mark modify data postion
		// 第3列 , 从0开始[0, 1, 2, ...]
	    3,
	    // new data
	    '',
	    // last data
	    ["before", "after", "before", "after", "after", "after", "before", "after", "before", "before"],
	    data,
	    // after command callback
	    function(msg){
	    	console.log(msg);
			renderATable(data);
	    }
	]);
}

document.getElementById('btn4').onclick = function () {

	// 数组对应的位置
	hxc3.excelCommand.do("editCol", [
		// mark modify data postion
		// 第3列 , 从0开始[0, 1, 2, ...]
	    4,
	    // new data
	    '20170101',
	    // last data
	    ["20161123", "20161125", "20161128", "20161129", "20161130", "20161201", "20161202", "20161205", "20161206", "20161207"],
	    data,
	    // after command callback
	    function(msg){
	    	console.log(msg);
			renderATable(data);
	    }
	]);
}

module.hot.accept();

// @charset "utf-8";
    var commonCommand = {
        /**
         * 编辑单元格
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
        },

        //编辑整列内容
        editCol:function(d){
            var xpos = d[0];
            var afterEditCon = d[1];
            var beforeEditCon = d[2];
            var data = d[3];
            var cbk = d[4];
            for (let i = 0; i < data.length; i++) {
                data[i][xpos] = afterEditCon;
            }
            cbk('edit column');
          
            return d;
        },

        editColRollup:function(d){
            var xpos = d[0];
            var afterEditCon = d[1];
            var beforeEditCon = d[2];
            var data = d[3];
            var cbk = d[4];
            for (let i = 0; i < data.length; i++) {
                data[i][xpos] = beforeEditCon[i];
            }
            cbk('rollup edit column');
          
            return d;
        },


        // 删除行列
        // ...

        // 添加行列
        // ...

    };

    export { commonCommand };

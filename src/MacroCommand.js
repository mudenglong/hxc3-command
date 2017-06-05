// @charset "utf-8";

    var EventTarget = require('hxc3-subscriber');
    var util = require('hxc3-util');

    var Command = function(options){
        EventTarget.call(this);

        var actions = {};
        var undoStack = [];
        var redoStack = [];

        this.actions = actions;
        this.undoStack = undoStack;
        this.redoStack = redoStack;

        this.options = {
            isDebug: false, // Debug mode for console messages
            actions: {},// actions to be added
            undoableDrag: true, // Whether dragging nodes are undoable can be a function as well
            stackSizeLimit: undefined, // Size limit of undo stack, note that the size of redo stack cannot exceed size of undo stack
            beforeUndo: function () { // callback before undo is triggered.

            },
            afterUndo: function () { // callback after undo is triggered.

            },
            beforeRedo: function () { // callback before redo is triggered.

            },
            afterRedo: function () { // callback after redo is triggered.

            },
            ready: function () {

            }
        }
    }

    util.inheritPrototype(Command, EventTarget);

    Command.prototype.init = function() {
        var that = this;
        //定义每种事件触发顺序
        $('.Jevent').on('click', '#undo', function(event) {
            event.preventDefault();

            that.trigger('beforeUndo');

            that.trigger('afterUndo');
        });
    };


    // Register action with its undo function & action name.
    Command.prototype.action = function(actionName, _do, _undo) {
        this.actions[actionName] = {
            _do: _do,
            _undo: _undo
        };

        return this;
    };

    // Calls registered function with action name actionName via actionFunction(args)
    Command.prototype.do = function (actionName, args) {

        this.redoStack = [];
        this.redoStack.push({
            name: actionName,
            args: args,
            firstTime: true
        });
        return this.redo();
    };

    // Redo last action
    Command.prototype.redo = function () {
        var that = this;
        if (!this.isRedoStackEmpty()) {
            var action = this.redoStack.pop();

            that.trigger(action.firstTime ? "beforeDo" : "beforeRedo", [action.name, action.args]);

            if (!action.args) action.args = {};
            action.args.firstTime = action.firstTime ? true : false;

            var res = this.actions[action.name]._do(action.args);

            this.undoStack.push({
                name: action.name,
                args: res
            });
            // 历史步骤判断
            if (this.options.stackSizeLimit != undefined && this.undoStack.length > this.options.stackSizeLimit ) {
                this.undoStack.shift();
            }

            that.trigger(action.firstTime ? "afterDo" : "afterRedo", [action.name, action.args]);
            return res;
        } else if (that.options.isDebug) {
            console.log("Redoing cannot be done because redo stack is empty!");
        }

    };


    // Undo last action
    Command.prototype.undo = function () {
        if (!this.isUndoStackEmpty()) {

            var action = this.undoStack.pop();
            this.trigger("beforeUndo", [action.name, action.args]);

            var res = this.actions[action.name]._undo(action.args);

            this.redoStack.push({
                name: action.name,
                args: res
            });

            this.trigger("afterUndo", [action.name, action.args]);
            return res;
        } else if (this.options.isDebug) {
            console.log("Undoing cannot be done because undo stack is empty!");
        }
    };

    // Redo last action
    Command.prototype.redo = function () {

        if (!this.isRedoStackEmpty()) {
            var action = this.redoStack.pop();

            this.trigger(action.firstTime ? "beforeDo" : "beforeRedo", [action.name, action.args]);

            if (!action.args) action.args = {};
            action.args.firstTime = action.firstTime ? true : false;

            var res = this.actions[action.name]._do(action.args);

            this.undoStack.push({
                name: action.name,
                args: res
            });
            
            if (this.options.stackSizeLimit != undefined && this.undoStack.length > this.options.stackSizeLimit ) {
                this.undoStack.shift();
            }

            this.trigger(action.firstTime ? "afterDo" : "afterRedo", [action.name, action.args]);
            return res;
        } else if (this.options.isDebug) {
            console.log("Redoing cannot be done because redo stack is empty!");
        }

    };

    // Gets whether redo stack is empty
    Command.prototype.isRedoStackEmpty = function () {
        return (this.redoStack.length === 0);
    };

    // Gets whether undo stack is empty
    Command.prototype.isUndoStackEmpty = function () {
        return (this.undoStack.length === 0);
    };

    module.exports = Command;


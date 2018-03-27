/**
 * Created by yblee on 2018-03-26.
 */
const Task = class {
    static title(a, b) { return a.sortTitle(b); }
    static date(a, b) { return a.sortDate(b); }

    constructor(title) {
        if(!title) throw 'invalid title'; else this._title = title;
        this._list = [];
    }
    add(task) { if(task instanceof Task) this._list.push(task); else throw 'invalid type : Task is needed'; }
    remove(task) {
        const list = this._list;
        if(list.includes(task)) list.splice(list.indexOf(task), 1);
    }
    getResult(sort, stateGroup) {
        const list = this._list;
        return {
            item: this._getResult(),
            children: (!stateGroup ? [...list].sort(sort) : [
                ...list.filter(v=>!v.isComplete()).sort(sort),
                ...list.filter(v=>v.isComplete()).sort(sort)
            ]).map(v=>v.getResult(sort, stateGroup))
        };
    }
    _getResult() { throw '_getResult must be overrided'; }
    isComplete() { throw 'isComplete must be overrided'; }
    sortTitle() { throw 'sortTitle must be overrided'; }
    sortDate() { throw 'sortDate must be overrided'; }
}

const TaskItem = class extends Task {
    constructor(title, date = Date.now()) {
        super(title);
        this._date = date;
        this._isComplete = false;
    }
    _getResult(sort, stateGroup) { return this; }
    isComplete() { return this._isComplete; }
    sortTitle(task) { return this._title > task._title; }
    sortDate(task) { return this._date > task._date; }
    toggle() { this._isComplete = !this._isComplete; }
}

const TaskList = class extends Task {
    constructor(title) { super(title); }
    _getResult() { return this._title; }
    isComplete() {}
    sortTitle(task) { return this; }
    sortDate(task) { return this; }

    byTitle(stateGroup = true) { return this._getList('title', stateGroup); }
    byDate(stateGroup = true) { return this._getList('date', stateGroup); }
}



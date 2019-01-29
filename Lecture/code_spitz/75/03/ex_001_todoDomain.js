/**
 * Created by yblee on 2018-03-26.
 */
const Task = class {
    constructor(title, date) {
        if(!title) throw 'invalid title';
        this._title = title;
        this._date = date;
        this._isComplete = false;
        this._list = [];
    }
    isComplete() { return this._isComplete; }
    toggle() { this._isComplete = !this._isComplete; }
    sortTitle(task) { return this._title > task._title; }
    sortDate(task) { return this._date > task._date; }
}

const taskSort = {
    title: (a, b)=>a.sortTitle(b),
    date: (a, b)=>a.sortDate(b)
}

const TaskList = class {
    constructor(title) {
        if(!title) throw 'invalid title';
        this._title = title;
        this._list = [];
    }
    add(title, date = Date.now()) {
        this._list.push(new Task(title, date));
    }
    remove(task) {
        const list = this._list;
        if(list.includes(task)) list.splice(list.indexOf(task), 1);
    }
    byTitle(stateGroup = true) { return this._getList('title', stateGroup); }
    byDate(stateGroup = true) { return this._getList('date', stateGroup); }
    _getList(sort, stateGroup) {
        const list = this._list, s = taskSort[sort];
        return !stateGroup ? [...list].sort(s) : [
                ...list.filter(v=>!v.isComplete()).sort(s),
                ...list.filter(v=>v.isComplete()).sort(s),
            ];
    }
}

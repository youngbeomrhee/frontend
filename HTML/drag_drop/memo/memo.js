const $tmemo = (function() {
    class Tmemo {
        constructor(memos=[this._Memo()], maxZIndex=0) {
            this.targetObject = {
                distanceFromParentLeft: 0,
                distanceFromParentTop: 0
            };
            this.memos = memos;
            this.maxZIndex = maxZIndex;
            this.resizeObserver = new ResizeObserver(this._onResize.bind(this));
            window.addEventListener('beforeunload', this._save.bind(this));
        }
        _Memo(id=''+new Date().getTime(), w='200px', h='100px', left='100px', top='100px', content='', zIndex=0) {
            return {
                id, w, h, left, top, content, zIndex
            };
        }
        // memo template을 변경하고 싶은 경우 memoEle와 memoEleText에 있는 영역을
        _memoEle(memoObj) {
            const headerEleTxt = `
                    <div class="header" data-id="${memoObj.id}" draggable="true" ondragstart="$tmemo._onDragStart(event)" ondragend="$tmemo._onDragEnd(event)">
                        <h1 class="blind">메모장</h1>
                        <button class="btn_close"><span class="blind">닫기</span></button>
                    </div>`,
                    contentEleTxt = `
                    <div class="content">
                        <div class="textarea" data-id="${memoObj.id}" contenteditable="true" style="width: 100%" onkeyup="$tmemo._onChangeContent(event, 'content')">
                            ${memoObj.content}
                        </div>
                    </div>`,
                    memoContainerEle = document.createElement('div');

            memoContainerEle.style.top = memoObj.top;
            memoContainerEle.dataset.id = memoObj.id;
            memoContainerEle.classList.add('memo');
            memoContainerEle.style.left = memoObj.left;
            memoContainerEle.style.width = memoObj.w;
            memoContainerEle.style.height = memoObj.h;
            memoContainerEle.style.zIndex = memoObj.zIndex;
            memoContainerEle.draggable = true;
            memoContainerEle.innerHTML = headerEleTxt + contentEleTxt;
            memoContainerEle.addEventListener('click', this._setMaxZIndex.bind(this));
            return memoContainerEle;
        }
        _memoEleText(memoObj) {
            const headerEleTxt = `
                    <div class="header" data-id="${memoObj.id}" draggable="true" ondragstart="$tmemo._onDragStart(event)" ondragend="$tmemo._onDragEnd(event)">
                        <h1 class="blind">메모장</h1>
                        <button onclick="$tmemo._remove(event)" class="btn_close"><span class="blind">닫기</span></button>
                    </div>`,
                    contentEleTxt = `
                    <div class="content">
                        <div class="textarea" data-id="${memoObj.id}" contenteditable="true" style="width: 100%" onkeyup="$tmemo._onChangeContent(event, 'content')">
                            ${memoObj.content}
                        </div>
                    </div>`,
                    memoContainerEle = `
                    <div class="memo" data-id="${memoObj.id}" style="top:${memoObj.top};left:${memoObj.left};width:${memoObj.w};height:${memoObj.h};z-index:${memoObj.zIndex}" onclick="$tmemo._setMaxZIndex(event)">
                        ${headerEleTxt}
                        ${contentEleTxt}
                    </div>
                    `;

            return memoContainerEle;
        }
        _addResizeObserver(ele) {
            this.resizeObserver.observe(ele);
        }
        _addResizeObserverAll() {
            document.querySelectorAll('.memo').forEach(ele => {
                this.resizeObserver.observe(ele);
            });
        }
        _add(left, top) {
            const memo = this._Memo(undefined, undefined, undefined, left+'px', top+'px', undefined, ++this.maxZIndex),
                    memoEle = this._memoEle(memo);
            this.memos.push(memo);
            this.container.appendChild(memoEle);
            this.resizeObserver.observe(memoEle);
        }
        _remove(ev) {
            const memoEle = ev.target.parentElement.parentElement,
                    id = memoEle.dataset.id;

            this.memos = this.memos.filter(memo => memo.id !== id);
            memoEle.remove();
        }
        _onDragStart(ev) {
            const container = ev.target.parentElement;
            this.targetObject.distanceFromParentLeft = ev.clientX - container.offsetLeft;
            this.targetObject.distanceFromParentTop = ev.clientY - container.offsetTop;
        }
        _onDragEnd(ev) {
            const ele = ev.target;
            ele.parentElement.style.left = ev.clientX - this.targetObject.distanceFromParentLeft + 'px';
            ele.parentElement.style.top = ev.clientY - this.targetObject.distanceFromParentTop + 'px';
            this._onMove(ele.parentElement);
        }
        _setMaxZIndex(ev) {
            function findMemoObj(ele) {
                return ele.classList.contains('memo') ? ele : findMemoObj(ele.parentElement);
            }
            const ele = ev.target,
                    memoEle = findMemoObj(ele),
                    memoEleZIndex = memoEle.style.zIndex,
                    id = ele.dataset.id;
            if(memoEleZIndex < this.maxZIndex) {
                const obj = {
                    zIndex: ++this.maxZIndex
                };
                this._changeMemo(id, obj);
                memoEle.style.zIndex = this.maxZIndex;
            }
        }
        _onMove(ele) {
            const id = ele.dataset.id,
                    left = ele.style.left,
                    top = ele.style.top,
                    obj = {
                        left, top
                    };
            this._changeMemo(id, obj);
        }
        _onResize(entries) {
            const ele = entries[0].target,
                    id = ele.dataset.id,
                    w = ele.style.width,
                    h = ele.style.height,
                    obj = {
                        w, h
                    };
            this._changeMemo(id, obj);
        }
        _onChangeContent(ev) {
            const ele = ev.target,
                    id = ele.dataset.id,
                    content = ele.innerHTML,
                    obj = { content };

            this._changeMemo(id, obj);
        }
        _changeMemo(id, obj) {
            this.memos = this.memos.map(memo => {
                return memo.id !== id ? memo : {
                    ...memo,
                    ...obj
                }
            });
        }
        _save(e) {
            e.preventDefault();
            const tmemo = {
                maxZIndex: this.maxZIndex,
                memos: this.memos
            };
            localStorage.setItem('tmemo', JSON.stringify(tmemo));
        }
        getUniqueId() {
            return new Date().getTime();
        }
        render(container) {
            const that = this,
                    memoEleText = this.memos.reduce((accum, memo) => accum + this._memoEleText(memo), '');
            this.container = container;
            this.container.innerHTML = memoEleText;
            this.container.addEventListener('mousedown', function(ev) {
                if(ev.button === 2) {
                    ev.preventDefault();
                    $tmemo._add(ev.clientX, ev.clientY);
                }
            });
            this._addResizeObserverAll();
        }
    }

    // 실행
    const ls = localStorage,
            lsTmemo = JSON.parse(ls.getItem('tmemo')) || {},
            memos = lsTmemo.memos,
            _tmemo = new Tmemo(memos, lsTmemo.maxZIndex);

    return _tmemo;
})();

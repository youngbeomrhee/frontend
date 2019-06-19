const $tmemo = (function() {
    class Tmemo {
        constructor(memos=[]) {
            this.targetObject = {
                distanceFromParentLeft: 0,
                distanceFromParentTop: 0
            };
            // this.eventStatus = {
            //     mouseClick: false
            // };
            this.memos = memos;
            // this._fetch(memos);
        }
        add(memo) {

        }
        memoEleText(memoObj) {
            return `
                <div class="memo" data-id="${memoObj.tId}" style="top:${memoObj.top}px;left:${memoObj.left}px;width:${memoObj.w}px; height:${memoObj.h}px;">
                    <div class="header" draggable="true" ondragstart="$tmemo.dragStart(event)" ondragend="$tmemo.dragEnd(event)">
                        <h1 class="blind">메모장</h1>
                        <button class="btn_close"><span class="blind">닫기</span></button>
                    </div>
                    <div class="content">
                        <div class="textarea" data-id="${memoObj.tId}" contenteditable="true" style="width: 100%" value="${memoObj.content}" onkeyup="$tmemo.changeMemo(event, 'content')">
                        </div>
                    </div>
                </div>
            `;
        }
        // memoEle(memoObj, aContainerEle, aHeaderEleTxt, aContentEleTxt) {
        //     const memoContainerEle = aContainerEle || document.createElement('div'),
        //             headerEleTxt = aHeaderEleTxt || `
        //         <div class="header">
        //             <h1 class="blind">메모장</h1>
        //             <button class="btn_close"><span class="blind">닫기</span></button>
        //         </div>`,
        //             contentEleTxt = aContentEleTxt || `
        //         <div class="content">
        //             <div class="textarea" contenteditable="true" style="width:${memoObj.w}px; height:${memoObj.h}px;" value="${memoObj.content}">
        //             </div>
        //         </div>
        //     `;
        //
        //     memoContainerEle.classList.add('memo');
        //     memoContainerEle.style.top = `${memoObj.top}px`;
        //     memoContainerEle.style.left = `${memoObj.left}px`;
        //     memoContainerEle.draggable = true;
        //     memoContainerEle.innerHTML = headerEleTxt + contentEleTxt;
        //     return memoContainerEle;
        // }
        // memoObj(memoEle) {
        //     // memoEle.dataset.id =
        // }
        setContainer(ele) {
            this.container = ele;
        }
        addResizeObserver() {
            const ro = new ResizeObserver(entries => {
                for (let entry of entries) {
                    console.dir(entry);

                    // entry.target.style.borderRadius = Math.max(0, 250 - entry.contentRect.width) + 'px';
                }
            });
            // Only observe the 2nd box
            document.querySelectorAll('.memo').forEach(ele => {
                ro.observe(ele);
            });
        }
        remove(memo) {

        }
        stringify() {

        }
        dragStart(ev) {
            const container = ev.target.parentElement;
            this.targetObject.distanceFromParentLeft = ev.clientX - container.offsetLeft;
            this.targetObject.distanceFromParentTop = ev.clientY - container.offsetTop;
        }
        dragEnd(ev) {
            ev.target.parentElement.style.left = ev.clientX - this.targetObject.distanceFromParentLeft + 'px';
            ev.target.parentElement.style.top = ev.clientY - this.targetObject.distanceFromParentTop + 'px';
        }
        changeMemo(ev) {

        }
        resize(that) {
            // const container = that.parentElement.parentElement;
            console.log('resize');
        }
        getUniqueId() {
            return new Date().getTime();
        }
        render() {
            const memoEleText = memos.reduce((accum, memo) => accum + this.memoEleText(memo), '');
            this.container.innerHTML = memoEleText;
            this.addResizeObserver();
        }
    }

    class Memo {
        constructor(tId=new Date().getTime(), w=200, h=100, left=100, top=100, content='') {
            this.id = tId;
            this.w = w;
            this.h = h;
            this.left = left;
            this.top = top;
            this.content = content;
        }/*
        move(left, top) {

        }
        resize(w, h) {

        }
        modify(memo) {

        }*/
    }

    // 실행
    const ls = localStorage,
        memos = JSON.parse(ls.getItem('tmemos')) || [new Memo()],
        _tmemo = new Tmemo(memos);

    function show(that) {
        that.style.display = 'block';
    }
    function hide(that) {
        that.style.display = 'none';
    }

    return _tmemo;
})();
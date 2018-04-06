/**
 * Created by yblee on 2018-04-06.
 */

var LinkedList = function (){
    this.head = null;
    this.tail = null;
};
LinkedList.prototype.addToTail = function(value){
    var node = this.makeNode(value);
    if (!this.head){ this.head = node; }
    if (this.tail){ this.tail.next = node; }
    this.tail = node;
}
LinkedList.prototype.removeHead = function(){
    if (this.head){
        var currentHeadValue = this.head.value;
        if (this.head.next){
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }
        return currentHeadValue
    } else {
        console.log('No head to remove.');
    }
}
LinkedList.prototype.contains = function(value){
    var currentNode = this.head;
    while (currentNode && currentNode.value){
        if (currentNode.value === value) return true;
        currentNode = currentNode.next;
    }
    return false;
}

LinkedList.prototype.makeNode = function(value){
    var node = {};
    node.value = value;
    node.next = null;
    return node;
};

var MAXRADIUS = 30;
var WIDTH = 960;
var HEIGHT = 500 - 97;
var TEXT_PADDING = 8;
var FONT_SIZE = 14;
var MARGIN = 24;

var svg = d3.select('body').append('svg')
    .style('background-color', '#665A88')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .append('g')
    .attr('transform', 'translate(' + MARGIN + ',' + MARGIN + ')' )

var linkedList = new LinkedList();
initializeLinkedList(linkedList);

var data = flattenLinkedList(linkedList);

var BOX_SIZE = 2 * (WIDTH - 2*MARGIN) / (data.length + 1);
var BOX_PORTION_OFFSET = MAXRADIUS*2;
var MAX_BOX_PORTION = HEIGHT - BOX_PORTION_OFFSET;

svg.selectAll('.nodes-circ').data(data, function(d){return d;}).enter()
    .append('circle')
    .attr('class', 'nodes-circ')
    .attr('r', function(d){return d/25;})
    .attr('cx', function(d, i){return i * (BOX_SIZE)/2 + BOX_SIZE/2;})
    .attr('cy', MAXRADIUS)
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('opacity', 0.85)

svg.selectAll('.nodes-rect').data(data, function(d){return d;}).enter()
    .append('rect')
    .attr('class', 'nodes-rect')
    .attr('x', function(d, i){return i * (BOX_SIZE)/2;})
    .attr('y', function(d, i){return BOX_PORTION_OFFSET + i*(MAX_BOX_PORTION - BOX_SIZE - 2*MARGIN)/(data.length - 1)})
    .attr('width', BOX_SIZE)
    .attr('height', BOX_SIZE)
    .attr('rx', BOX_SIZE/10)
    .attr('ry', BOX_SIZE/10)
    .attr('fill', 'white')
    .attr('stroke', '#665A88')
    .attr('opacity', 0.85)

svg.selectAll('.nodes-text').data(data, function(d){return d;}).enter()
    .append('text')
    .attr('class', 'nodes-text')
    .attr('font-size', FONT_SIZE)
    .attr('x', function(d, i){return i * (BOX_SIZE)/2 + TEXT_PADDING;})
    .attr('y', function(d, i){return BOX_PORTION_OFFSET + i*(MAX_BOX_PORTION - BOX_SIZE - 2*MARGIN)/(data.length - 1) + FONT_SIZE + TEXT_PADDING;})
    .text(function(d, i){
        if (i === 0) return d + ' (H)';
        if (i === (data.length - 1)) return d + ' (T)';
        return d;
    })
    .attr('fill', '#665A88')

function updateViz(){
    var data = flattenLinkedList(linkedList)
    var nodesCirc = svg.selectAll('.nodes-circ').data(data, function(d){return d;});
    var nodesRect = svg.selectAll('.nodes-rect').data(data, function(d){return d;});
    var nodesText = svg.selectAll('.nodes-text').data(data, function(d){return d;});

    // update
    BOX_SIZE = 2 * (WIDTH - 2*MARGIN) / (data.length + 1);
    nodesCirc.transition().duration(1000)
        .attr('cx', function(d, i){return i * (BOX_SIZE)/2 + BOX_SIZE/2;})
    nodesRect.transition().duration(1000)
        .attr('x', function(d, i){return i * (BOX_SIZE)/2;})
        .attr('y', function(d, i){return BOX_PORTION_OFFSET + i*(MAX_BOX_PORTION - BOX_SIZE - 2*MARGIN)/(data.length - 1)})
        .attr('width', BOX_SIZE)
        .attr('height', BOX_SIZE)
        .attr('rx', BOX_SIZE/10)
        .attr('ry', BOX_SIZE/10)
    nodesText.transition().duration(1000)
        .attr('x', function(d, i){return i * (BOX_SIZE)/2 + TEXT_PADDING;})
        .attr('y', function(d, i){return BOX_PORTION_OFFSET + i*(MAX_BOX_PORTION - BOX_SIZE - 2*MARGIN)/(data.length - 1) + FONT_SIZE + TEXT_PADDING;})
        .text(function(d, i){
            if (i === 0) return d + ' (H)';
            if (i === (data.length - 1)) return d + ' (T)';
            return d;
        })

    // enter
    nodesCirc.enter()
        .append('circle')
        .attr('class', 'nodes-circ')
        .attr('r', function(d){return d/25;})
        .attr('cx', function(d, i){return i * (BOX_SIZE)/2 + BOX_SIZE/2;})
        .attr('cy', MAXRADIUS)
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('opacity', 0.85)

    nodesRect.enter()
        .append('rect')
        .attr('class', 'nodes-rect')
        .attr('x', function(d, i){return i * (BOX_SIZE)/2;})
        .attr('y', function(d, i){return BOX_PORTION_OFFSET + i*(MAX_BOX_PORTION - BOX_SIZE - 2*MARGIN)/(data.length - 1)})
        .attr('width', BOX_SIZE)
        .attr('height', BOX_SIZE)
        .attr('rx', BOX_SIZE/10)
        .attr('ry', BOX_SIZE/10)
        .attr('fill', 'white')
        .attr('stroke', '#665A88')
        .attr('opacity', 0.85)

    nodesText.enter()
        .append('text')
        .attr('class', 'nodes-text')
        .attr('font-size', FONT_SIZE)
        .attr('x', function(d, i){return i * (BOX_SIZE)/2 + TEXT_PADDING;})
        .attr('y', function(d, i){return BOX_PORTION_OFFSET + i*(MAX_BOX_PORTION - BOX_SIZE - 2*MARGIN)/(data.length - 1) + FONT_SIZE + TEXT_PADDING;})
        .text(function(d, i){
            if (i === 0) return d + ' (H)';
            if (i === (data.length - 1)) return d + ' (T)';
            return d;
        })
        .attr('fill', '#665A88')

    //exit
    nodesCirc.exit()
        .transition().duration(1000)
        .attr('opacity', 0)
        .remove()

    nodesRect.exit()
        .transition().duration(1000)
        .attr('opacity', 0)
        .remove()

    nodesText.exit()
        .transition().duration(1000)
        .attr('opacity', 0)
        .remove()
}

function flattenLinkedList(linkedList){
    var data = [];
    var cursor = linkedList.head;
    while (cursor && cursor.value){
        data.push(cursor.value);
        cursor = cursor.next;
    }
    return data;
}

function initializeLinkedList(linkedList){
    var initializeAmount = d3.range(0,11);
    initializeAmount.forEach(function(){
        linkedList.addToTail(Math.round(Math.random()*MAXRADIUS*25));
    })
}

function randomLinkedListAction(linkedList){
    var action = Math.round(Math.random()*1);
    if (action === 0){
        manualAddToTail();
    } else if (action === 1){
        manualRemoveHead();
    }
}

function manualAddToTail(){
    var value = Math.round(Math.random()*MAXRADIUS*25);
    linkedList.addToTail(value);
    document.getElementById('status-text').innerHTML = 'Added ' + value;
    updateViz();
}
function manualRemoveHead(){
    var value = linkedList.removeHead();
    document.getElementById('status-text').innerHTML = 'Removed ' + value;
    updateViz();
}
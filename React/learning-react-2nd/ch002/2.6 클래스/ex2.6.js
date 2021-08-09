function Vacation(dest, len) {
  this.destination = dest;
  this.length = len;
}

Vacation.prototype.print = function () {
  console.log(this.destination + '은(는) ' + this.length + ' 일 걸립니다.');
}

const maui = new Vacation('마우이', 7);

maui.print();

Class
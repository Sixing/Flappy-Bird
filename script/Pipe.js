const gameWidth = gameDom.clientWidth;

class Pipe extends Rectangle {
  constructor(height, top, speed, dom) {
    super(52, height, gameWidth, top, speed, 0, dom);
  }

  onMove() {
    if(this.left < -this.width) {
      //移除dom
      this.dom.remove()
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class PipePair {
  constructor(speed) {
    this.spaceHeight = 150; //空隙位置高度
    this.minHeight = 80; //最小高度
    this.maxHeight = landTop - this.minHeight - this.spaceHeight;
    const upHeight = getRandom(this.minHeight, this.maxHeight);

    const upDom = document.createElement('div');
    const downDom = document.createElement('div');

    upDom.className = "pipe up";
    downDom.className = "pipe down";

    this.upPipe = new Pipe(upHeight, 0, speed, upDom); //上水管
    const downHeight = landTop - upHeight - this.spaceHeight;
    const downTop = landTop - downHeight
    this.downPipe = new Pipe(downHeight, downTop, speed, downDom); //下水管

    gameDom.appendChild(upDom)
    gameDom.appendChild(downDom)
  }

  //该水管对是否已移除数字
  get useLess() {
    return this.upPipe.left < -this.upPipe.width;
  }

  move(duration){
    this.upPipe.move(duration);
    this.downPipe.move(duration);
  }
}

//不断产生水管对
class PipePairProducer {
  constructor(speed) {
    this.pairs = [];
    this.timer = null;
    this.tick = 2500;
    this.speed = speed;
  }

  startProduce() {
    if(this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.pairs.push(new PipePair(this.speed));
      //移除掉用不到的水管
      for(let i = 0; i < this.pairs.length; i++) {
        const pair = this.pairs[i];
        if(pair.useLess) {
          this.pairs.splice(i, 1);
          i--;
        }
      }
    }, this.tick)
  }

  stopProduce() {
    clearInterval(this.timer);
    this.timer = null;
  }
}

// var producer = new PipePairProducer(-100);
// producer.startProduce();

// setInterval(() => {
//   producer.pairs.forEach(item => {
//     item.move(16 / 1000)
//   })
// }, 16)
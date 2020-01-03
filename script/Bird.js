const birdDom = document.querySelector('.bird');
const birdStyle = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdTop = parseFloat(birdStyle.top);
const birdLeft = parseFloat(birdStyle.left);
const gameDom = document.querySelector('.game');
const gameHeight = document.querySelector('.game').clientHeight;

class Bird extends Rectangle {
  constructor() {
    super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
    this.g = 1500; //向下的加速度，单位：像素/秒^2
    this.maxY = gameHeight - landHeight - this.height; //最大的y坐标
    this.swingStatus = 1; //小鸟的翅膀状态
    this.timer = null; //翅膀煽动的计时器
  }

  render() {
    super.render(); //重用父类渲染逻辑
    this.dom.className = `bird swing${this.swingStatus}`
  }

  //开始煽动翅膀
  startSwing() {
    if (this.timer) {
      return
    }

    this.timer = setInterval(() => {
      this.swingStatus++;
      if (this.swingStatus === 4) {
        this.swingStatus = 1;
      }
      this.render();
    }, 200)
  }

  //结束煽动翅膀
  stopSwing() {
    clearInterval(this.timer)
    this.timer = null; 
  }

  move(duration) {
    super.move(duration); //调用父类方法
    //根据加速度改变速度
    this.ySpeed += this.g * duration;
  }

  onMove() {
    //控制坐标范围
    if(this.top < 0) {
      this.top = 0;
    }else if(this.top > this.maxY) {
      this.top = this.maxY;
    }
  }

  //直接给一个向上的速度
  jump() {
    this.ySpeed = -450;
  }
}

// var bird = new Bird();
// bird.startSwing();

// setInterval(() => {
//   bird.move(16 / 1000)
// }, 16)
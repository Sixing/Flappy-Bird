

class Game {
  constructor() {
    this.sky = new Sky()
    this.land = new Land(-100)
    this.bird = new Bird()
    //柱子对生成器
    this.pipeProducer = new PipePairProducer(-100)
    this.timer = null;
    this.tick = 16 //地洞时间间隔
    this.gameover = false;
  }

  start() {
    if(this.timer) {
      return 
    }

    if (this.gameover) {
      //重新开始游戏
      window.location.reload()
    }

    this.pipeProducer.startProduce() //开始生成柱子
    this.bird.startSwing()
    this.timer = setInterval(() => {
      const duration = this.tick / 1000;
      this.sky.move(duration)
      this.land.move(duration)
      this.bird.move(duration)
      this.pipeProducer.pairs.forEach(item => {
        item.move(duration)
      })
      if (this.isGameOver()) {
        this.stop()
        this.gameover = true
      }
    }, this.tick)
  }
  /**
   * 判断两个举行是否碰撞
   * @param {} rec1 
   * @param {*} rec2 
   */
  isHit(rec1, rec2) {
    //横向： 两个距离的中心点的横向距离，是否小于矩形宽度之和的一半
    //纵向： 两个距离的中心点的纵向距离，是否小于矩形高度之和的一半
    const centerX1 = rec1.left + rec1.width / 2
    const centerY1 = rec1.top + rec1.height / 2
    const centerX2 = rec2.left + rec2.width / 2
    const centerY2 = rec2.top + rec2.height / 2

    const disX = Math.abs(centerX1 - centerX2); //中心点横向距离
    const disY = Math.abs(centerY1 - centerY2) //重点店纵向距离
    if (disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 
    2 ) {
      return true
    }
    return false
  }

  isGameOver () {
    if (this.bird.top === this.bird.maxY) {
      //鸟碰到大地
      return true
    }

    //判断柱子对是否跟Bird碰撞
    for(let i = 0; i < this.pipeProducer.pairs.length; i++) {
      const pairs = this.pipeProducer.pairs[i];
      if (this.isHit(this.bird, pairs.upPipe) || this.isHit(this.bird, pairs.downPipe)) {
        return true
      }
    }
    return false
  }

  stop() {
    clearInterval(this.timer)
    this.timer = null
    this.bird.stopSwing()
    this.pipeProducer.stopProduce()
  }

  //关联键盘时间
  regEvent() {
    window.onkeydown = (e) => {
      if (e.key === 'Enter') {
        if (this.timer) {
          this.stop()
        }else {
          this.start()
        }
      } else if (e.key === ' ') {
        this.bird.jump()
      }
    }
  }
}

var g = new Game()
g.regEvent()

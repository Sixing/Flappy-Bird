/**
 * 矩形类，可以移动
 * 属性： 宽度，高度，横坐标，纵坐标，横向速递，纵向速度，对应的dom对象
 * xSpeed：横向速度，单位(像素/秒)，正数是向右，负数向左
 * ySpeed: 纵向速度，单位(像素/秒)，正数是向下
 */

class Rectangle {
  constructor(width, height, left, top, xSpeed, ySpeed, dom ) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.dom = dom;
    this.render();
  }

  onMove() {}

  render() {
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';
    this.dom.style.left = this.left + 'px';
    this.dom.style.top = this.top + 'px'; 
  }

    /**
     * 按照举行的速度，和制定时间，移动矩形
     * @param {*} duration 单位： 秒
     */
  move(duration) {
    const xDis = this.xSpeed * duration; //横向的距离
    const yDis = this.ySpeed * duration; //纵向的距离
    this.left = this.left + xDis;
    this.top = this.top + yDis;
    //有可能会重新更改坐标

    if(this.onMove) {
      //每次移动后，渲染前，都会调用这个方法
      this.onMove(); //是否存在onMove方法，如果存在，则调用一次
    }

    this.render()
  }
}
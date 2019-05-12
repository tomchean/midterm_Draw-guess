
// 需要用到的变量定义
let clickX = [];
let clickY = [];
let clickDrag = [];
let paint;
let point = {notFirst:false};
let canvasDiv =  null; // 初始化画布父盒子
let canvas = document.createElement('canvas'); // 创建画板
let context = canvas.getContext("2d"); // 创建2d画布
let canvasWidth = 0; // 初始化画布宽度
let canvasHeight = 0; // 初始化画布高度


/* ------------ 需要用到的一些功能函数  ------------ */

function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}
function draw(){
  while ( clickX.length  > 0 ) {
    point.bx = point.x;
    point.by = point.y;
    point.x = clickX.pop();
    point.y = clickY.pop();
    point.drag = clickDrag.pop();
    context.beginPath();
    if (point.drag && point.notFirst) {
      context.moveTo(point.bx, point.by);
    } else {
      point.notFirst = true;
      context.moveTo(point.x - 1, point.y);
    }
     context.lineTo(point.x, point.y);
     context.closePath();
     context.stroke();
  }
}
/* 创建画布背景和画笔 */
function create() {
  // 以下是创建画布背景
  context.rect(0, 0, canvasWidth, canvasHeight); 
  context.fillStyle="#f2f2f2"; // 图片北京色是灰色，此处去除会变黑色
  context.fill();
  // 设置画笔属性
  context.strokeStyle = "#666";
  context.lineJoin = "round";
  context.lineWidth = 2;
  clickDrag = [];
  clickX = [];
  clickY = [];
}

export default class {
  /* 初始化 */
  constructor(socket){
    this.socket = socket;

    this.socket.on('update_cor',(data=>{
      clickX.push(data.x);
      clickY.push(data.y);
      clickDrag.push(data.drag);
      draw();
    }))
    this.socket.on('change_brush',value=>{
      context.lineWidth = value;
    })
    this.socket.on('change_color',value=>{
      context.strokeStyle = value;
    })
    this.socket.on('clear',(data=>{
      var prev = {
        width:context.lineWidth,
        color :context.strokeStyle
      }
      canvas.width = canvas.width; 
      canvas.height = canvas.height;
      create(); // 重新创建画布背景和画笔
      context.lineWidth = prev.width;
      context.strokeStyle = prev.color;
    }))

  }
  init = (canvasDivDom, classname)=>{
    canvasDiv = canvasDivDom; // 传入画布父盒子
    canvasWidth = canvasDiv.clientWidth; // 获取父盒子宽度
    canvasHeight = canvasDiv.clientHeight; // 获取父盒子高度
    // 设置属性并追加元素
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.style.boxSizing = 'border-box';
    canvasDiv.appendChild(canvas);
    // 创建画布背景和画笔
    create();
    // 开始监控画图
    setTimeout(() => {
      this.listen(classname); 
    }, 1500);
  }
  /* 画图时的监控 */
  listen = (classname)=> {
    // 获取盒子需要的参数
    let left = canvas.getBoundingClientRect().left;
    let top = canvas.getBoundingClientRect().top;
    
    // 支持 移动端
    canvasDiv.addEventListener("touchstart", (e)=>{
      paint = true;
      classname && (this.className = classname);
      (e.touches) && (e = e.touches[0]);
      addClick(e.pageX - left, e.pageY - top);
      this.send_click(e.pageX - left, e.pageY - top);
      draw();
    });
    
    canvasDiv.addEventListener("touchmove", (e)=>{
      if(!paint) {
        return;
      }
      (e.touches) && (e = e.touches[0]);
      addClick(e.pageX - left, e.pageY - top, true);
      this.send_click(e.pageX - left, e.pageY - top, true);
      draw();
    });

    canvasDiv.addEventListener("touchend", function(e){
      paint = false;
    });
    
    // 支持 PC 端
    canvasDiv.addEventListener("mousedown",  (e) => {
      paint = true;
      classname && (this.className = classname);
      addClick(e.pageX - left, e.pageY - top);
      this.send_click(e.pageX - left, e.pageY - top);
      draw();
    });
    
    canvasDiv.addEventListener("mousemove",  (e) => {
      if(!paint) {
        return;
      }
      addClick(e.pageX - left, e.pageY - top, true);
      this.send_click(e.pageX - left, e.pageY - top, true);
      draw();
    });

    canvasDiv.addEventListener("mouseup", function(e){
      paint = false;
    });
    
    canvasDiv.addEventListener("mouseleave", function(e){
      paint = false;
    });
  }
  send_click = (x,y,dragging) =>{
    this.socket.emit('click',{
      x: x,
      y: y,
      drag:dragging
    });
  }


  change_bursh = (event) =>{
    context.lineWidth = event.target.value;
    this.socket.emit('change_brush',event.target.value);
  }
  change_color = (event) =>{
    context.strokeStyle = event.target.value;
    this.socket.emit('change_color',event.target.value);
  }

  /* 清理 */
  clear = ()  => {
    // 使用此方式来清理画布
    var prev = {
      width:context.lineWidth,
      color :context.strokeStyle
    }
    canvas.width = canvas.width; 
    canvas.height = canvas.height;
    create(); // 重新创建画布背景和画笔
    context.lineWidth = prev.width;
    context.strokeStyle = prev.color;
    this.socket.emit('clear');
  }
}




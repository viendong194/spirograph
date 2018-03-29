
export default class Canvas{
  constructor(){
    console.log("it's worked");
    this.container = document.getElementById("canvas-container");
    this.init();
   
    window.addEventListener('resize',()=>{this.resizeCanvas()},false);
    
  }
  init = () => {
    this.canvas = document.createElement("canvas");
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight; 
    
    this.t = 0;
    this.props = {bigCircle:100, k:4, holePen:10, t:0} ;
    this.nowPoint = {x:0,y:0}
    this.plot = [];
    this.loop();
  }
  drawSpirograph = () => {
    this.props.t = this.t;
    let max = this.plot.length-1;

    if (max<0) return;
    if(this.t>40){
      this.t = 0;
      this.props.bigCircle = Math.random()*200+100;
      this.props.k = Math.random()*10+4;
      this.props.holePen = this.props.bigCircle/this.props.k*Math.random();
    }
    this.ctx.strokeStyle= "#315998";
    this.ctx.beginPath();
    this.ctx.moveTo(this.plot[max].x,this.plot[max].y);
    for(let i = 0 ;i < 1000; i++){
     
      if(max<0) break;
      this.ctx.lineTo(this.plot[max-i].x,this.plot[max-i].y);
    }
    
    this.ctx.stroke();
    this.ctx.strokeStyle="#000000";
    
  }
  createSpirograph = (props) =>{
    let R = props.bigCircle;
    let r = R / props.k;
    let p = props.holePen;
    let t = props.t;
    let x;
    let y;
    x = (R - r) * Math.cos(t) + p * Math.cos(((R - r) / r) * t),
    y = (R - r) * Math.sin(t) - p * Math.sin(((R - r) / r) * t)
    
    return {x:x+this.canvas.width/2,y:y+this.canvas.height/2}
  }
  loop = () => {
    this.t+=0.1;
    this.nowPoint = this.createSpirograph(this.props);
    this.plot.push(this.nowPoint);
    this.drawSpirograph();
    window.requestAnimationFrame(()=> this.loop());
  }
  resizeCanvas = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}
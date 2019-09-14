class Vector2 {
    x: number = 0;
    y: number = 0;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    distanceTo(other: Vector2){
        let xVal: number = other.x - this.x;
        xVal *= xVal;
        let yVal: number = other.y - this.y;
        yVal *= yVal;
        return Math.sqrt(xVal +yVal);
    }
}

class AnimatedPoint {
    width = 0;
    height = 0;
    position: Vector2;
    speed: Vector2;
    bounds: Vector2;
    constructor(width: number, height: number, position:Vector2, bounds:Vector2) {
        this.width = width;
        this.height = height;
        this.position = position;
        if(Math.random()* 10 > 5){
            this.speed = new Vector2(1,1);
        }else{
            this.speed = new Vector2(1,-1);
        }
        
        this.bounds = bounds;
    }
    update(){
        if(this.position.x > this.bounds.x){
            this.position.x = 10;
        }else if( this.position.x  <0){
            this.position.x = this.bounds.x -10;
        }
        if(this.position.y > this.bounds.y || this.position.y < 0){
            this.speed.y *= -1;
        }
            
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }
    distanceTo(other:AnimatedPoint){
        return this.position.distanceTo(other.position);
    }
}
class Rendering {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    isRed: boolean;
    colorString: string = 'rgb(200,0,0)';
    pointsList = [];
    seperationDistance:number = 70;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.setBackgroundColor(this.colorString);
        this.context.fillRect(0, 0, 800, 800);
        this.isRed = true;
        let bounds: Vector2 = new Vector2(this.canvas.width, this.canvas.height);
        for(let x =0; x<100; x++){
            let xPos = Math.random()*this.canvas.width +8;
            let yPos = Math.random()*this.canvas.height +8;
            
            this.pointsList[x] = new AnimatedPoint(4,4,new Vector2(xPos,yPos),bounds);
        }
    }
    setBackgroundColor(color:string){
        this.context.fillStyle = color;
        this.context.fillRect(0,0,800,800);
    }
    update() {
        this.context.fillStyle = 'rgb(235, 235, 200)';
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        for(let i =0; i<this.pointsList.length-1; i++){
            this.pointsList[i].update();
            this.context.beginPath();
            this.context.moveTo(this.pointsList[i].position.x,this.pointsList[i].position.y);
            this.context.arc(this.pointsList[i].position.x, this.pointsList[i].position.y, this.pointsList[i].width,0,360);
            this.context.fill();
            for(let x=i+1; x<this.pointsList.length-1; x++){
                if(x != this.pointsList.length-1){
                    if(this.pointsList[i].distanceTo(this.pointsList[x])<=this.seperationDistance){
                        
                        this.context.lineTo(this.pointsList[x].position.x,this.pointsList[x].position.y);
                    }
                    
                }
            }
            this.context.strokeStyle = 'white';
            this.context.stroke();
            
        }
        requestAnimationFrame(()=>this.update());
    }
}
function initialize() {
    var render = new Rendering(document.getElementById("mainCanvas") as HTMLCanvasElement);
    requestAnimationFrame(()=>render.update());
    //var timer = setInterval(()=>render.update(), 18);
}


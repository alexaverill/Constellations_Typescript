var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.distanceTo = function (other) {
        var xVal = other.x - this.x;
        xVal *= xVal;
        var yVal = other.y - this.y;
        yVal *= yVal;
        return Math.sqrt(xVal + yVal);
    };
    return Vector2;
}());
var AnimatedPoint = /** @class */ (function () {
    function AnimatedPoint(width, height, position, bounds) {
        this.width = 0;
        this.height = 0;
        this.width = width;
        this.height = height;
        this.position = position;
        if (Math.random() * 10 > 5) {
            this.speed = new Vector2(1, 1);
        }
        else {
            this.speed = new Vector2(1, -1);
        }
        this.bounds = bounds;
    }
    AnimatedPoint.prototype.update = function () {
        if (this.position.x > this.bounds.x) {
            this.position.x = 10;
        }
        else if (this.position.x < 0) {
            this.position.x = this.bounds.x - 10;
        }
        if (this.position.y > this.bounds.y || this.position.y < 0) {
            this.speed.y *= -1;
        }
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    };
    AnimatedPoint.prototype.distanceTo = function (other) {
        return this.position.distanceTo(other.position);
    };
    return AnimatedPoint;
}());
var Rendering = /** @class */ (function () {
    function Rendering(canvas) {
        this.colorString = 'rgb(200,0,0)';
        this.pointsList = [];
        this.seperationDistance = 70;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.setBackgroundColor(this.colorString);
        this.context.fillRect(0, 0, 800, 800);
        this.isRed = true;
        var bounds = new Vector2(this.canvas.width, this.canvas.height);
        for (var x = 0; x < 100; x++) {
            var xPos = Math.random() * this.canvas.width + 8;
            var yPos = Math.random() * this.canvas.height + 8;
            this.pointsList[x] = new AnimatedPoint(4, 4, new Vector2(xPos, yPos), bounds);
        }
    }
    Rendering.prototype.setBackgroundColor = function (color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, 800, 800);
    };
    Rendering.prototype.update = function () {
        var _this = this;
        this.context.fillStyle = 'rgb(235, 235, 200)';
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.pointsList.length - 1; i++) {
            this.pointsList[i].update();
            this.context.beginPath();
            this.context.moveTo(this.pointsList[i].position.x, this.pointsList[i].position.y);
            this.context.arc(this.pointsList[i].position.x, this.pointsList[i].position.y, this.pointsList[i].width, 0, 360);
            this.context.fill();
            for (var x = i + 1; x < this.pointsList.length - 1; x++) {
                if (x != this.pointsList.length - 1) {
                    if (this.pointsList[i].distanceTo(this.pointsList[x]) <= this.seperationDistance) {
                        this.context.lineTo(this.pointsList[x].position.x, this.pointsList[x].position.y);
                    }
                }
            }
            this.context.strokeStyle = 'white';
            this.context.stroke();
        }
        requestAnimationFrame(function () { return _this.update(); });
    };
    return Rendering;
}());
function initialize() {
    var render = new Rendering(document.getElementById("mainCanvas"));
    requestAnimationFrame(function () { return render.update(); });
    //var timer = setInterval(()=>render.update(), 18);
}

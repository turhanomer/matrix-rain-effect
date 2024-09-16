var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Effect_instances, _Effect_initialize;
var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var gradient = ctx.createLinearGradient(canvas.width / 2, canvas.height / 2, 100, canvas.width / 2, canvas.height / 2, canvas.width / 2);
gradient.addColorStop(0, "#32de84");
gradient.addColorStop(0.2, "#00FF40");
gradient.addColorStop(1, "#006A4E");
gradient.addColorStop(0.4, "#03C03C");
gradient.addColorStop(0.8, "#568203");
gradient.addColorStop(0.6, "#4B6F44");
var Symbol = /** @class */ (function () {
    function Symbol(x, y, fontSize, canvasHeight) {
        this.characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ｱｲｳｴｵｶｷｸｹｺ";
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = "";
        this.canvasHeight = canvasHeight;
    }
    Symbol.prototype.draw = function (context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        // Eğer canvas'ın yüksekliğini aştıysa, y'yi sıfırlıyoruz
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        }
        else {
            this.y += 1;
        }
    };
    return Symbol;
}());
var Effect = /** @class */ (function () {
    function Effect(canvasWidth, canvasHeight) {
        _Effect_instances.add(this);
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25; // Burada bir başlangıç değeri veriyoruz
        this.columns = Math.floor(this.canvasWidth / this.fontSize);
        this.symbols = [];
        __classPrivateFieldGet(this, _Effect_instances, "m", _Effect_initialize).call(this);
    }
    Effect.prototype.resize = function (width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        __classPrivateFieldGet(this, _Effect_instances, "m", _Effect_initialize).call(this);
    };
    return Effect;
}());
_Effect_instances = new WeakSet(), _Effect_initialize = function _Effect_initialize() {
    for (var i = 0; i < this.columns; i++) {
        this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
};
var effect = new Effect(canvas.width, canvas.height);
var lastTime = 0;
var fps = 15;
var nextFrame = 1000 / fps;
var timer = 0;
function animate(timeStamp) {
    var deltaTime = timeStamp - lastTime;
    if (timer > nextFrame) {
        lastTime = timeStamp;
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.textAlign = "center";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = gradient;
        ctx.font = effect.fontSize + "px monospace";
        effect.symbols.forEach(function (symbol) { return symbol.draw(ctx); });
        timer = 0;
    }
    else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}
animate(0);
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
});

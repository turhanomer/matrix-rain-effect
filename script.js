var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Effect_instances, _Effect_initialize;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var Symbol = /** @class */ (function () {
    function Symbol(x, y, canvasHeight) {
        this.characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ｱｲｳｴｵｶｷｸｹｺ";
        this.x = x;
        this.y = y;
        this.fontSize = 25;
        this.text = "";
        this.canvasHeight = canvasHeight;
    }
    Symbol.prototype.draw = function (context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillStyle = "#0aff0a";
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight) {
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
        this.fontSize = 25;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        __classPrivateFieldGet(this, _Effect_instances, "m", _Effect_initialize).call(this);
        console.log(this.symbols);
    }
    return Effect;
}());
_Effect_instances = new WeakSet(), _Effect_initialize = function _Effect_initialize() {
    for (var i = 0; i < this.columns; i++) {
        this.symbols[i] = new Symbol(i, 0, this.canvasHeight);
    }
};
var effect = new Effect(canvas.width, canvas.height);
function animate() {
    ctx.font = effect.fontSize + "px monospace";
    effect.symbols.forEach(function (symbol) { return symbol.draw(ctx); });
    requestAnimationFrame(animate);
}
animate();

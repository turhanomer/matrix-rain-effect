const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(
  canvas.width / 2,
  canvas.height / 2,
  100,
  canvas.width / 2,
  canvas.height / 2,
  canvas.width / 2
);
gradient.addColorStop(0, "#32de84");
gradient.addColorStop(0.2, "#00FF40");
gradient.addColorStop(1, "#006A4E");
gradient.addColorStop(0.4, "#03C03C");
gradient.addColorStop(0.8, "#568203");
gradient.addColorStop(0.6, "#4B6F44");

class Symbol {
  characters: string;
  x: number;
  y: number;
  fontSize: number;
  text: string;
  canvasHeight: number;

  constructor(x: number, y: number, fontSize: number, canvasHeight: number) {
    this.characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ｱｲｳｴｵｶｷｸｹｺ";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = "";
    this.canvasHeight = canvasHeight;
  }

  draw(context: CanvasRenderingContext2D) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

    // Eğer canvas'ın yüksekliğini aştıysa, y'yi sıfırlıyoruz
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  canvasWidth: number;
  canvasHeight: number;
  fontSize: number;
  columns: number;
  symbols: Symbol[];

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25; // Burada bir başlangıç değeri veriyoruz
    this.columns = Math.floor(this.canvasWidth / this.fontSize);
    this.symbols = [];
    this.#initialize();
  }

  // Private method
  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }
  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 15;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp: number) {
  const deltaTime = timeStamp - lastTime;
  if (timer > nextFrame) {
    lastTime = timeStamp;
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.textAlign = "center";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient;
    ctx.font = effect.fontSize + "px monospace";
    effect.symbols.forEach((symbol) => symbol.draw(ctx));
    timer = 0;
  } else {
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
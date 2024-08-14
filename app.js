var myCanvas = document.getElementById("tuval");
var ctx = myCanvas.getContext("2d");

console.log(ctx.fillStyle);
let range = document.getElementById("size");
const button1 = document.querySelectorAll(".ready-size")[0];
const button2 = document.querySelectorAll(".ready-size")[1];
const button3 = document.querySelectorAll(".ready-size")[2];
const eraser = document.querySelectorAll(".ready-size")[3];
let inputColor = document.getElementById("color");
const exportButton = document.getElementById("export");
console.log(exportButton);

function updateCanvas() {
  ctx.fillStyle = "#f3e0c3"; //? Arka plan rengini ayarla
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
}

eventList();
function eventList() {
  //? özel kalem boyutlandırma buttonları
  button1.addEventListener("click", () => {
    lineW = 0.7;
    range.value = 0.7;
  });
  button2.addEventListener("click", () => {
    lineW = 5;
    range.value = 5;
  });
  button3.addEventListener("click", () => {
    lineW = 9;
    range.value = 9;
    // console.log("çalıştı", lineW);
  });
  inputColor.addEventListener("input", () => {
    ctx.strokeStyle = inputColor.value;
  });
  eraser.addEventListener("click", () => [(ctx.strokeStyle = "#f3e0c3")]);
  exportButton.addEventListener("click", () => {
    myCanvas.toBlob((Blob) => {
      const newA = document.createElement("a");
      const url = URL.createObjectURL(Blob);

      newA.href = url;
      newA.download = "canvas-image.png";
      newA.click();
      newA.remove();
      console.log(newA);
    }, "image/png");
  });
}


myCanvas.height = myCanvas.offsetHeight;
myCanvas.width = myCanvas.offsetWidth;
let draw = false;
firstX = null;
firstY = null;
let lineW = 3;

range.addEventListener("input", (e) => {
  //console.log(range.value);
  lineW = range.value;
});

document.querySelectorAll(".tool-color").forEach((palet, id) => {
  palet.style.background = `var(--tool-item-${id}-color)`;
  palet.addEventListener("click", (e) => {
    colorClick(id);
  });
});

function colorClick(id) {
  console.log("calıştı", id);
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue(
    `--tool-item-${id}-color`
  );
}

document.getElementById("ClearAll").addEventListener("click", () => {
  console.log("çalıştı");
  ctx.clearRect(0, 0, myCanvas.clientWidth, myCanvas.clientHeight);
});

myCanvas.addEventListener("mousedown", (e) => (draw = true));
myCanvas.addEventListener("mouseup", (e) => (draw = false));
myCanvas.addEventListener("mouseleave", (e) => (draw = false));

myCanvas.addEventListener("mousemove", (e) => {
  if (firstX == null || firstY == null || !draw) {
    firstX = e.clientX - myCanvas.offsetLeft;
    firstY = e.clientY - myCanvas.offsetTop;
    return;
  }
  ctx.beginPath();
  lastX = e.clientX;
  lastY = e.clientY;
  ctx.lineWidth = lineW;
  ctx.lineCap = "round";

  ctx.moveTo(firstX, firstY);
  ctx.lineTo(lastX, lastY);
  ctx.stroke();
  firstX = lastX;
  firstY = lastY;
});
updateCanvas();

const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");
const brushButton = document.getElementById("brush");
const eraserButton = document.getElementById("eraser");
const clearButton = document.getElementById("clear");
const saveButton = document.getElementById("save");
const brushSettings = document.getElementById("brush-settings");
const eraserSettings = document.getElementById("eraser-settings");
const brushSizeInput = document.getElementById("brush-size");
const brushColorInput = document.getElementById("brush-color");
const eraserSizeInput = document.getElementById("eraser-size");
const closeBrushSettings = document.getElementById("close-brush-settings");
const closeEraserSettings = document.getElementById("close-eraser-settings");
const announcementModal = document.getElementById("announcement");
const closeAnnouncement = document.getElementById("close-announcement");

let isDrawing = false;
let isErasing = false;
let brushSize = 5;
let brushColor = "#000000";
let eraserSize = 10;

// 初始化画布大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 关闭公告弹窗
closeAnnouncement.addEventListener("click", () => {
  announcementModal.style.display = "none";
});

// 设置按钮激活状态
function setActiveButton(activeButton) {
  document.querySelectorAll(".tool-button").forEach((button) => {
    button.classList.remove("active");
  });
  activeButton.classList.add("active");
}

// 画笔按钮点击事件
brushButton.addEventListener("click", () => {
  isErasing = false;
  setActiveButton(brushButton);
  brushSettings.style.display = "flex";
});

// 橡皮按钮点击事件
eraserButton.addEventListener("click", () => {
  isErasing = true;
  setActiveButton(eraserButton);
  eraserSettings.style.display = "flex";
});

// 关闭画笔设置
closeBrushSettings.addEventListener("click", () => {
  brushSettings.style.display = "none";
});

// 关闭橡皮设置
closeEraserSettings.addEventListener("click", () => {
  eraserSettings.style.display = "none";
});

// 画笔大小设置
brushSizeInput.addEventListener("input", () => {
  brushSize = brushSizeInput.value;
});

// 画笔颜色设置
brushColorInput.addEventListener("input", () => {
  brushColor = brushColorInput.value;
});

// 橡皮大小设置
eraserSizeInput.addEventListener("input", () => {
  eraserSize = eraserSizeInput.value;
});

// 鼠标按下事件
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
});

// 鼠标移动事件
canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    if (isErasing) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = eraserSize;
      ctx.strokeStyle = "rgba(0, 0, 0, 1)"; // 橡皮擦颜色
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = brushColor;
    }
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  }
});

// 鼠标松开事件
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  ctx.closePath();
});

// 鼠标离开画布事件
canvas.addEventListener("mouseleave", () => {
  isDrawing = false;
});

// 清屏按钮点击事件
clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// 保存按钮点击事件
saveButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "whiteboard.png";
  link.href = canvas.toDataURL();
  link.click();
});

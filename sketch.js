let lineCount = 80; // 水草數量
let lines = []; // 儲存水草的資料
let iframe; // 儲存 iframe 元素

function setup() { // 初始值設定
  // 創建透明的畫布
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute'); // 設置畫布為絕對定位
  canvas.style('z-index', '1'); // 設置畫布層級為 1，讓其位於 iframe 上方
  canvas.style('pointer-events', 'none'); // 禁用畫布的鼠標事件，讓 iframe 可操作

  // 創建 iframe
  iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/'); // 設定 iframe 的網址
  iframe.style('position', 'absolute');
  iframe.style('border', 'none');
  iframe.style('width', '100%'); // 充滿整個視窗寬度
  iframe.style('height', '100%'); // 充滿整個視窗高度
  iframe.style('left', '0'); // 左側對齊
  iframe.style('top', '0'); // 頂部對齊
  iframe.style('z-index', '0'); // 設置 iframe 層級為 0，讓其位於畫布下方

  // 初始化水草資料
  for (let i = 0; i < lineCount; i++) {
    let baseColor = color(random(['#ffc1cc', '#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff'])); // 粉嫩色調
    baseColor.setAlpha(200); // 降低透明度，設置為 200

    lines.push({
      x: random(width), // 水草的水平位置
      height: random(150, 300), // 水草的高度
      color: baseColor, // 水草的顏色
      thickness: random(20, 35), // 增加水草的粗細範圍
      frequency: random(0.01, 0.05), // 水草搖晃的頻率
    });
  }
}

function draw() { // 畫圖
  clear(); // 清除畫布，讓背景透明

  blendMode(BLEND); // 設定混合模式為 BLEND，允許顏色透明重疊

  // 繪製每條水草
  for (let i = 0; i < lines.length; i++) {
    drawWavingLine(lines[i]);
  }
}

function drawWavingLine(line) {
  stroke(line.color); // 設定水草顏色
  strokeWeight(line.thickness); // 設定水草粗細
  noFill(); // 無填充

  beginShape();
  for (let y = height; y > height - line.height; y -= 10) {
    let offsetX = sin(frameCount * line.frequency + y * 0.05) * map(y, height - line.height, height, 20, 0); // 減小彎曲幅度
    vertex(line.x + offsetX, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 畫布大小隨視窗大小改變

  // 調整 iframe 的大小和位置
  iframe.style('width', '100%'); // 充滿整個視窗寬度
  iframe.style('height', '100%'); // 充滿整個視窗高度
  iframe.style('left', '0'); // 左側對齊
  iframe.style('top', '0'); // 頂部對齊
}







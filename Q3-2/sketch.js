// 2D アニメーションゲームのようなインタラクション
let x, y;
let vx, vy;
const g = 1;

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  vx = 0;
  vy = 0;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);
  const size = height * 0.1; // キャラクターのサイズ

  // 地面を描く
  const groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  // BLANK[1] キャラクターの左右移動
  let speed = 2; // 通常の速度
  if (keyIsDown(LEFT_ARROW)) {
    if (keyIsDown(SHIFT)) speed = 4.0; // SHIFTキーでスピードアップ
    x -= speed;
  } 
  if (keyIsDown(RIGHT_ARROW)) {
    if (keyIsDown(SHIFT)) speed = 4.0;
    x += speed;
  }

  // BLANK[2] 重力とジャンプ
  x += vx;
  y += vy;
  vy += g; // 重力は「速度の変化量」
  if(y < height * 0.8 ){ vy = -1 * vy; }


  // 速くなりすぎないように制限
  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  // 位置を更新
  x += vx;
  y += vy;

  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);
}
// 2D アニメーションゲームのようなインタラクション
let x, y;
let vx, vy;
const g = 1;
let enemyX, enemyY;
let enemySpeed = 2.2;
let startTime;

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  vx = 0;
  vy = 0;

  // 敵の位置を初期化
  enemyX = 0;
  enemyY = height * 0.8 - 50;   

  startTime = millis();  // ゲーム開始時間を記録
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);
  const size = height * 0.1; // キャラクターのサイズ
  const groundY = height * 0.8;

  // 地面
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  // キャラクターの左右移動 
  let speed = 2; // 通常の速度
  if (keyIsDown(LEFT_ARROW)) {
    if (keyIsDown(SHIFT)) speed = 4.0;
    x -= speed;
  } 
  if (keyIsDown(RIGHT_ARROW)) {
    if (keyIsDown(SHIFT)) speed = 4.0;
    x += speed;
  }

  // 重力
  applyGravity(groundY, size);  

  // ジャンプ（上キー）
  if (keyIsDown(UP_ARROW) && y >= groundY- size/2) {
    vy = -20;
  }

  // 速くなりすぎないように制限
  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);
  let elapsed = (millis() - startTime) / 1000;
  
  // ======== カウントダウン表示 ========
  if(elapsed < 3){
    fill(255);
    textSize(80);
    textAlign(CENTER, CENTER);

    let count = 3 - floor(elapsed);
    text(count, width/2, height/2);

    // まだ敵は動かさないので return
    return;
  }
}

function applyGravity(groundY, size){
  // 位置の更新
  x += vx;
  y += vy;

  // 重力
  vy += g;

  // 地面に着いたら止める（バウンドさせない）
  if (y > groundY - size / 2){
    y = groundY - size / 2;
    vy = 0;
  }

    // ======== カウントダウン後だけ敵を動かす ========
  if ((millis() - startTime) / 1000 >= 3){
    enemyX += enemySpeed;

    if(enemyX > width || enemyX < 0){
      enemySpeed *= -1;
    }

    fill(255, 0, 0);
    ellipse(enemyX, enemyY, 50, 50);

  // ======== 敵の移動 ========
  enemyX += enemySpeed;

  // 端にぶつかったら反転
  if(enemyX > width || enemyX < 0){
   enemySpeed *= -1;
  }

  // 敵を描く（赤い丸）
  fill(255, 0, 0);
  ellipse(enemyX, enemyY, 50, 50);

  // ======== 当たり判定 ========
  // プレイヤーとの距離を計算
  let d = dist(x, y, enemyX, enemyY);

    if(d < size/2 + 25){  //  プレイヤー半径 + 敵半径 
      noLoop(); // アニメーション停止（ゲームオーバー）
      fill(255, 0, 0);
      textSize(50);
      text("GAME OVER", width/2 - 150, height/2);
    }
  }
}
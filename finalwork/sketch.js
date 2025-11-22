//変数を準備する
let x, y;             //プレーヤーの位置
let vx, vy;           //プレーヤーの速度
let basespeed = 3;        //通常の速度
const g = 1;          //重力の大きさ
let enemyX, enemyY;   //敵の位置
let enemySpeed = 3.5; //敵の速度
let start;            //ゲーム開始時刻
let onGround = false;

function setup(){     //最初に一度だけ実行
  createCanvas(windowWidth, windowHeight);  //画面サイズをウィンドウに合わせる
  //プレーヤーの初期位置
  x = width / 2;
  y = height / 2;
  vx = 0;
  vy = 0;
  // 敵の初期位置
  enemyX = 0;
  enemyY = height * 0.8 - 50;   
  // ゲーム開始時間を記録
  start = millis();
}

function windowResized(){     //画面の大きさ変更にも対応
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){                 //毎フレーム実行
  background(160, 192, 255);     //空色の背景
  const groundY = height * 0.8;
  const size = height * 0.1;      // キャラクターのサイズ
  fill(64, 192, 64);              // 地面
  rect(0, groundY, width, height - groundY);
  // キャラクターの左右移動 
let speed;
if (keyIsDown(SHIFT)) {
  speed = 6;
} else {
  speed = basespeed;
}
if (keyIsDown(RIGHT_ARROW)) {
  x += speed;
}
if (keyIsDown(LEFT_ARROW)) {
  x -= speed;
}
  // 重力
  Gravity(groundY, size);  
  // ジャンプ（上キー）
  if (keyIsDown(UP_ARROW) && onGround) {
    vy = -20;
    onGround = false;
  }

  // 速くなりすぎないように制限
  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);
  //カウントダウン表示
  let time = (millis() - start) / 1000;
  if(time < 3){
    fill(255);
    textSize(80);
    textAlign(CENTER, CENTER);
    text(3 - floor(time), width/2, height/2);
    return;// まだ敵は動かさないので return
  }
  // ======== 敵の移動 ========
  enemyX += enemySpeed;

  if(enemyX > width || enemyX < 0){ // 端にぶつかったら反転かつスピードup
   enemySpeed *= -1.1;
  }

  fill(255, 0, 0);          // 敵を描く（赤い丸）
  ellipse(enemyX, enemyY, 50, 50);

  gameOver(size);
}

function Gravity(groundY, size){
  x += vx;
  y += vy;    // 位置の更新
  vy += g;    // 重力を加える

  // 接地判定
  if (y >= groundY - size / 2) {
    y = groundY - size / 2;
    vy = 0;
    onGround = true; // 地面に着いた
  } else {
    onGround = false; // 空中
  }
}

function gameOver(size){
  let d = dist(x, y, enemyX, enemyY);     // プレイヤーとの距離を計算
  if(d < size/2 + 25){                    //プレイヤー半径 + 敵半径 
    noLoop();                             // アニメーションdraw()を止める
   
    //ゲームオーバー
    fill(255, 0, 0);
    textSize(50);
    text("GAME OVER", width/2, height/2);
  }
}

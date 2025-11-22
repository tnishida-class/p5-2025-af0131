// たくさん出てくるアニメーション
let balls;
let targets; // 追加（ボールを当てる的）

function setup(){
  createCanvas(windowWidth, windowHeight);
  balls = [];
  targets = [];
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);

  // 的のアニメーション
  for(let i = 0; i < targets.length; i++){
    let t = targets[i];
    fill(0);//黒
    ellipse(t.x, t.y, t.size);
    t.x += t.vx;//的の位置を動かす
    t.y += t.vy;
    t.size += 2;//的が大きくなるようにする
  }

  // ボールのアニメーション
  for(let i = 0; i < balls.length; i++){
    let b = balls[i];
    fill(255);//白
    ellipse(b.x, b.y, b.size);
    b.x += b.vx;//ボールの位置を動かす
    b.y += b.vy;
  }

  // 画面外に出たボールを配列から削除する
  const ballsInCanvas = []; // 画面内のボールを一時的に保持する配列
  for(let i = 0; i < balls.length; i++){
    let b = balls[i];
    if(b.x > 0 && b.x < width && b.y > 0 && b.y < height){ // 画面内
      ballsInCanvas.push(b);
    }
  }
  balls = ballsInCanvas; // 画面内のボールだけを残す

  if(frameCount % 20 === 0) { // 20フレームごとに新しい的を追加する
    // 新しい的オブジェクトを作成して targets 配列に追加しよう
    const angle = random(TWO_PI); // 0〜2πのランダムな角度
    const speed = 3;              // 一定速度
    const t = {
      x: width / 2,               // 画面中心から出す
      y: height / 2,
      vx: cos(angle) * speed,     //ｘ方向の成分に速さ(speed)で動く
      vy: sin(angle) * speed,
      size: 10                    // 初期サイズ
    };
    targets.push(t);
  }

  // ボールに当たった or 大きくなりすぎた的を配列から削除する
  const activeTargets = []; // 生き残った的を一時的に保持する配列
  for(let i = 0; i < targets.length; i++){
    let t = targets[i];
    if(t.size < 200){ // 大きくなりすぎていない
      let hit = false;
      for(let j = 0; j < balls.length; j++){ // すべてのボールと衝突判定
        let b = balls[j];
        let d = dist(t.x, t.y, b.x, b.y);
        if(d < (t.size / 2 + b.size / 2)){ // 当たった！
          hit = true;
          break;
        }  
      }
      if(!hit) activeTargets.push(t); // 衝突していなければ生き残る
    }
  }
  targets = activeTargets; // 生き残った的だけを残す
}
//マウスを動かしてボールを生成
function mouseDragged(){
  const dx = mouseX - pmouseX;//マウスがｘ方向にどれだけ動いたか
  const dy = mouseY - pmouseY;
  if(mag(dx, dy) > 5){
    const b = { x: mouseX, y: mouseY, size: 20, vx: dx, vy: dy };
    balls.push(b);//ボール配列に追加
  }
}
//ボールが画面内にあるかどうかチェック
function insideCanvas(b) {
  return b.x > 0 && b.x < width && b.y > 0 && b.y < height;
}
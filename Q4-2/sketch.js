// 折れ線グラフ
function setup(){
  createCanvas(400, 400);
  background(240);

  // 配列をランダムに初期化する
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(0, 400); // 20以上100未満のランダムな数を代入
  }

  // 横線を引く
  const n = 10;
  for(let i = 0; i < n; i++){ line(0, height * i / n, width, height * i / n); }

  // ここからが本番
  fill(0);
  const dx = width / scores.length;
  let px, py; // 線を引くために一つ前の点を覚えておく変数
  for(let i = 0; i < scores.length; i++){
    let x = i * dx + dx / 2;
    let y = height - scores[i]; // 下が0になるように反転
    // 点を描く
    ellipse(x, y, 6, 6);
    //線を引く
    line(px,py,x,y);
    px = x;//現在の点を次の線の始点更新
    py = y;
  }
}
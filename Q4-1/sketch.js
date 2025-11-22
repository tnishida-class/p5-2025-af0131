function setup(){
  createCanvas(200, 200);
  background(240);

  // 配列をランダムに初期化する
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100);
  }
  console.log(scores);
  
  // 合計を計算する
  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  //平均を計算する
  const average = sum / scores.length;
  //最大値を探す
  let largest = 0;
  for(let i = 0; i < scores.length; i++){
    if(scores[i] > largest){
      largest = scores[i];
    }
  }
  //最小値を探す
  let smallest = 100;
  for(let i = 0; i < scores.length; i++){
    if(scores[i] < smallest){
      smallest = scores[i];
    }
  }
  // 背景に横線をn本引く
  const n = 10;
  for(let i = 0; i < n; i++){
    line(0, height * i / n, width, height * i / n);
  }
  
  // 棒を描く
  noStroke();
  for(let i = 0; i < scores.length; i++){
    const dx = width / scores.length;//横幅
    const h = height * scores[i] / 100;//高さ

    if(scores[i] == largest){ fill(255, 0, 0); }//最大値を赤
    else if(scores[i] == smallest){ fill(0, 0, 255); }//最小値を青
    else{ fill(128); }//その他を灰色
    rect(i * dx + 2, height - h, dx - 4, h);
  }
  //平均値の線をひく
  const ay = height - height * average / 100;
  stroke(0, 255, 0);
  line(0, ay, width, ay);
}
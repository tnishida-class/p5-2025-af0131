// 吹き出し
function setup(){
  createCanvas(400, 400);
  textSize(16);
}

function draw(){
  background(200);
  balloon("関数は難しい？", 100, 100);
  balloon("関数は便利？", mouseX, mouseY);
}

function balloon(t, x, y){
  const w = textWidth(t); // テキストの幅
  const h = textAscent() + textDescent(); // テキストの高さ
  const p = 4; // 余白の大きさ (padding)
  const r = 15; //丸みをつけてみた
  push();

  // BLANK[1] 吹き出しの背景を先に描く
  fill(300,150,150);//吹き出し背景
  stroke(0);//枠線黒
  rect(x,y,w+p*2,h+p*2,r);

  // BLANK[2] 吹き出しの三角形を描く
  const tx = x + (w + p * 2) / 2; // 吹き出しの中央下から
  const ty = y + h + p * 2;
  triangle(tx - 6, ty, tx + 6, ty, tx, ty + 15); // 小さな三角形

  // 吹き出しのテキストを次に描く
  textAlign(LEFT, CENTER);
  fill(255);
  text(t, x + p, y + h / 2 + p);
  
  pop();
}
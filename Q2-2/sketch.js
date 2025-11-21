// チェッカー
function setup() {
  createCanvas(200, 200);
  const size = width / 8; // マスの一辺の長さ
  noStroke();
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      if ((i + j) % 2 == 0) {
        fill(255); // 白
      } else {
        fill(200); // 灰色
      }
      rect(i * size, j * size, size, size)

      if ((i + j) % 2 == 1 && j<3) {
        fill(255, 0, 0); // 赤
        circle(size * i + size / 2, size * j + size / 2, size * 0.8); // 中心に丸
      }
      if ((i + j) % 2 == 1 && j>4) {
        fill(0); 
        circle(size * i + size / 2, size * j + size / 2, size * 0.8); 
      }
    }
  }
}
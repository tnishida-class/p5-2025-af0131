// カレンダーを描画しよう
function setup(){
  createCanvas(200, 200);
  background(0);      // 黒背景
  fill(255);          // 白文字
  textSize(16);       // 文字大きく
  drawCalendar(2025, 10);
}

function drawCalendar(y, m){
  for(let i = 0; i < 7; i++){
    const x = i * width / 7;
    const y = 20;
    stroke(255);
    text(dayOfWeekAsString(i), x, y);
  }

  let dow = dayOfWeek(y, m, 1);
  for(let d = 1; d <= daysInMonth(y, m); d++){
    const x = (dow % 7) * (width / 7);
    const y = 40 + floor(dow / 7) * 20;

    fill(255);
    noStroke();
    text(d, x + 5, y);

    dow++;
  }
}
//うるう年判定
function isLeapYear(y){
  return (y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0);
}
//一年は何日？
function daysInYear(y){
  return isLeapYear(y) ? 366 : 365;
}
//ひと月に何日ある？
function daysInMonth(y, m){
  if(m == 2){
    return isLeapYear(y) ? 29 : 28;
  }
  else if(m == 4 || m == 6 || m == 9 || m == 11){
    return 30;
  }
  else{
    return 31;
  }
}

function dayOfYear(y, m, d){
  let count = 0;
  for(let i = 1; i < m; i++){
    count += daysInMonth(y, i);//次の月になる
  }
  return count + d;
}

function dayOfWeek(y, m, d){
  let days = 0;

  // 1970年から前後に移動する
  if (y >= 1970) {
    for (let i = 1970; i < y; i++) {
      days += daysInYear(i);
    }
  } else {
    for (let i = y; i < 1970; i++) {
      days -= daysInYear(i);
    }
  }
  days += dayOfYear(y, m, d);

  // 1970/1/1 は木曜（=4）
  return (days + 4) % 7;
}
function dayOfWeekAsString(dow){
  const a = ["日", "月", "火", "水", "木", "金", "土"];
  return a[dow];
}

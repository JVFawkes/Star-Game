var c; // variable untuk mendapatkan ID Canvas
var ctx; // Variable Canvas yang siap untuk gambar 2 D
var poin=0; // Variable untuk simpan poin
var starPos=[]; // Variable untuk simpan koordinat objek bintang
var smileyPos=[]; // Variable untuk simpan koordinat objek smiley
var interval; // variable untuk menyimpan interval kecepatan
paused = false;

//Menggambar Smiley
function drawStar(x, y, r, p, m)
{
ctx.fillStyle="yellow";
ctx.save();
ctx.beginPath();
ctx.translate(x, y);
ctx.moveTo(0,0-r);
for (var i = 0; i < p; i++)
{
	ctx.rotate(Math.PI / p);
	ctx.lineTo(0, 0 - (r*m));
	ctx.rotate(Math.PI / p);
	ctx.lineTo(0, 0 - r);
}
ctx.fill();
ctx.restore();
}
// Menggambar Bintang
function drawSmiley(x,y){
ctx.beginPath();
r=c.width*0.05;
ctx.fillStyle="green";
ctx.arc(x, y, r, 0, 2 * Math.PI);
ctx.moveTo((x-0.5*r), (y-0.25*r));
ctx.arc((x-0.5*r), (y-0.25*r), 0.2*r, 0, 2 * Math.PI);
ctx.moveTo((x+0.5*r), (y-0.25*r));
ctx.arc((x+0.5*r), (y-0.25*r), 0.2*r, 0, 2 * Math.PI);
ctx.moveTo((x-0.5*r), (y+0.25*r));
ctx.bezierCurveTo((x-0.5*r), (y+0.75*r), (x+0.5*r), (y+0.75*r), (x+0.5*r), (y+0.25*r));
ctx.fill();
ctx.stroke();
}

// Menggambar Poin
function drawPoin()
{
ctx.fillStyle="white";
ctx.fillRect(c.width*0.74,12, 60, 10);
ctx.fillStyle="RED";
ctx.fillText("POIN="+poin,c.width*0.75,20);
}

function drawGame() {
ctx.clearRect(0, 0, c.width, c.height);
//1. Draw 4 star
for(i=0;i<4;i++){
	drawStar(starPos[i][0], starPos[i][1], c.width*0.04, 5, 0.5);
}
//2. Draw Emoji Smiley
drawSmiley(smileyPos[0],smileyPos[1]);
//3. Draw Poin
drawPoin();
}

//Gerakan Bintang jatuh
function MoveStar(){
  if (!paused) {
    for(i=0;i<4;i++){
    starPos[i][1]=starPos[i][1]+2;
    nabrak();
    if(starPos[i][1]>c.height){
      starPos[i]=[Math.random()*c.width,Math.random()*c.height/4];
      poin+=10;
  }
}
}
drawGame();
}

// Gerakan Smiley
function moveSmiley(dir) {
  if (!paused) {
    if (dir == "up") {smileyPos[1] -=4; }
    if (dir == "down") {smileyPos[1] +=4;}
    if (dir == "left") {smileyPos[0] -=5; }
    if (dir == "right") {smileyPos[0] +=5;}
  }
drawGame();
}

function togglePause()
{
    if (!paused)
    {
        paused = true;
        document.getElementById('togglepause').innerHTML = "Resume";
    } else if (paused)
    {
       paused= false;
       document.getElementById("togglepause").innerHTML="Pause";
    }
}
function nabrak(){
 	var temp = 0.85*(c.width*0.05+c.width*0.04);
    var distance;
        for (var i = 0; i < 4; i++) {
            var dist = Math.sqrt( Math.pow((smileyPos[0]-starPos[i][0]),2) + Math.pow((smileyPos[1]-starPos[i][1]), 2) );
              if (dist<temp) {
                alert("Game Over !!");
                reset();
              }
        }
}
function play() {
c = document.getElementById("myCanvas");
ctx = c.getContext("2d");
poin=0;
for(i=0;i<4;i++){
	starPos[i]=[Math.random()*c.width,Math.random()*c.height/4];
	smileyPos=[c.width/2,0.85*c.height];
}
drawGame();
interval = setInterval(MoveStar, 100);
}

function reset(){
  paused = false;
  clearInterval(interval);
  play();
}

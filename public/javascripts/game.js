let tileSize =  {w: 50, h: 50};
let tilesWide = 8;
let tilesHigh = 8;
function Viewport(x, y, w, h, s) {
  this.x = x;
  this.y = y;
  this.xOff = x%tileSize.w;
  this.yOff = y%tileSize.h;
  this.w = w;
  this.h = h;
  this.speed = s;
  this.getStartTile = () => {
    let tile = {};
    tile.x = Math.floor(this.x/tileSize.w);
    tile.y = Math.floor(this.y/tileSize.h);
    return tile;
  }
}

let camera = new Viewport(0, 0, tilesWide * tileSize.w, tilesHigh * tileSize.h, 1.5);
let currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;
let keysDown = {w: false, a: false, s: false, d: false};


/*
* Generate the map from a 2d perlin noise function
*/

let map = [];

let debug = {
  fps: "fps",
  startTile: "startTile",
  camera: "camera"
}
let writeDebug = function(){};

window.onload = () => {
  //Define debugger function
  let debugEl = document.getElementById("debug");
  writeDebug = function(){
    for (const key in debug) {
      if (el = document.getElementById(key)){
        el.innerHTML = `${key}: ${debug[key]}`;
      }
      else {
        let newDebug = document.createElement("p");
        newDebug.id = key;
        newDebug.style = "font-weight: bold";
        newDebug.innerHTML = `${key}: ${debug[key]}`;
        debugEl.appendChild(newDebug);
      }
    }
  }

  //Set context and draw animation
  ctx = document.getElementById('game').getContext("2d");
  ctx.font = "bold 10pt sans-serif";
  requestAnimationFrame(drawGame);

  map = generateMap();
  console.log(map);

  window.addEventListener("keydown", (e) => {
    if (e.keyCode == 87) keysDown.w = true;
    else if (e.keyCode == 65) keysDown.a = true;
    else if (e.keyCode == 83) keysDown.s = true;
    else if (e.keyCode == 68) keysDown.d = true;
  });
  window.addEventListener("keyup", (e) => {
    if (e.keyCode == 87) keysDown.w = false;
    else if (e.keyCode == 65) keysDown.a = false;
    else if (e.keyCode == 83) keysDown.s = false;
    else if (e.keyCode == 68) keysDown.d = false;
  });
}

tilesUpdated = true;

let tile = {
  x: 0,//the x pixel where the tile will be drawn
  y: 0, //the y pixel where the tile will be drawn
  mapX: 0, //the x map coordinate of the tile
  mapY: 0 // the y map coordinate of the tile
};

function drawGame() {
  if (ctx == null) {return;}

  let currentFrameTime = Date.now();
  let timeElapsed = currentFrameTime - lastFrameTime;

  let sec = Math.floor(Date.now()/1000);
  if (sec!= currentSecond) {
    currentSecond = sec;
    framesLastSecond = frameCount;
    frameCount = 1;
  } else { frameCount++;}

  debug.fps = framesLastSecond;

/*
* Loop through all the grid tiles on the screen and draw them according to the
* camera's position on the map.
*/
for (let gridY=0; gridY < tilesHigh + 1; gridY++) {
  for (let gridX=0; gridX < tilesWide + 1; gridX++) {
      startTile = camera.getStartTile();
      debug.camera = `x: ${camera.x}, y: ${camera.y}, w: ${camera.w}, h: ${camera.h}`;
      debug.startTile = `x: ${startTile.x}, y: ${startTile.y}`;
      /*
      *setup our tile on the grid
      */
      tile.x = gridX * tileSize.w - camera.xOff;
      tile.y = gridY * tileSize.h - camera.yOff;
      tile.mapX = gridX + startTile.x;
      tile.mapY = gridY + startTile.y;

      // debug.tile = `x: ${tile.x}, y: ${tile.y}, mapX: ${tile.mapX}, mapY: ${tile.mapY}`;


      /*Color the tile based on where the camera is
      * Below, the call to the map array has the mapY coming before the mapX.
      * This is because of the way that the map array was defined.
      */
      try{

        if (map.chunks[0][tile.mapY][tile.mapX] === 1) {
          ctx.fillStyle = "red";
        }
        else {
          ctx.fillStyle = "blue";
        }
        ctx.fillRect(tile.x, tile.y, tileSize.w, tileSize.h);

        //print the tile index on the tile
        ctx.fillStyle = "black";
        ctx.fillText(`${tile.mapX}, ${tile.mapY}`, tile.x, tile.y + tileSize.h);
        // ctx.fillText(`i:${i},j:${j}`, tile.x, tile.y + 25);

    } catch(err) {
      debug.error = `There was an error ${err}, mapY: ${tile.mapY}`;
    }
      //print debug messages
      // ctx.fillStyle = "#aaaaaa";
      // ctx.fillRect(6*tileSize.w, 7*tileSize.h, tileSize.w*2, tileSize.h);
      // ctx.font = "9px serif";
      // ctx.fillStyle = "black";
      // ctx.fillText(`tileSize: h:${tileSize.h} w:${tileSize.w}`, 6 * tileSize.w + 2, 7 * tileSize.h + 10)
      // ctx.fillText(`startTile: x:${startTile.x} x${startTile.y}`, 6 * tileSize.w + 2, 7 * tileSize.h + 20)
      // ctx.fillText(`camera: x:${camera.x} x${camera.y}`, 6 * tileSize.w + 2, 7 * tileSize.h + 30)
      // ctx.fillText(`FPS: ${framesLastSecond}`, 6 * tileSize.w + 2, 7 * tileSize.h + 40)
    }

  }

  if (keysDown.w) {
    camera.y -= camera.speed;
  }
  if (keysDown.a) {
    camera.x -= camera.speed;
  }
  if (keysDown.s) {
    camera.y += camera.speed;
  }
  if (keysDown.d) {;
    camera.x += camera.speed;
  }
  camera.xOff = camera.x%tileSize.w;
  camera.yOff = camera.y%tileSize.h;
writeDebug();
requestAnimationFrame(drawGame);

}

function getMapTile(mapx, mapy) {

}


// console.log(tilePath);

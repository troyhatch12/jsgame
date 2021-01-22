
const paper = require('paper/dist/paper-core');

const { Path, Point, Size, Rectangle } = paper;

window.onload = function() {
  console.log("script running");
  const canvas = document.getElementById('game');

  paper.setup(canvas);


  canvas.height = 400;
  canvas.width = 400;

  var path = new Path();
  path.strokeColor = 'blue';
  var start = new Point(100, 100);
  path.moveTo(start);
  path.lineTo(start.add [ 200, -50 ]);

  paper.view.draw();
}

paper.view.onFrame = (event) => {

  let tileSize = new Size(50, 50);

  let map = [];
  map[0] = [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1];
  map[1] = [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1];
  map[2] = [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1];
  map[3] = [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1];
  map[4] = [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1];
  map[5] = [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1];
  map[6] = [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1];
  map[7] = [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1];
  map[8] = [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1];
  map[9] = [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1];
  map[10] = [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1];
  map[11] = [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1];



  let tilesWide = canvas.width / tileSize.width;
  let tilesHigh = canvas.height / tileSize.height;
  let camera = new Rectangle(1, 1, tilesWide, tilesHigh);

  for (i=0; i < tilesHigh; i++) {
    for (j=0; j < tilesWide; j++) {
      //setup our tile on the grid
      let tilePoint = new Point(j * tileSize.width - camera.x, i * tileSize.height - camera.y)
      let tileRect = new Rectangle(tilePoint, tileSize);
      let tilePath = new Path.Rectangle(tileRect);

      //Color the tile based on the mapLocation
      // let mapLocation = new Point(tilePoint.x + camera.x, tilePoint.y + camera.y);
      let text = new paper.PointText(tilePoint.x, tilePoint.y + tileSize.height);
      text.fillColor = 'black';
      text.content = `${i},${j}`;
      if (map[i][j] == 1) {
        tilePath.fillColor = 'red';
        tilePath.strokeColor = 'black';
      }
      else {
        tilePath.fillColor = 'blue';
        tilePath.strokeColor = 'black';
      }


      // console.log("tileswide: ", tilesWide);
      // console.log("tileshigh: ", tilesHigh);
    }

}



}

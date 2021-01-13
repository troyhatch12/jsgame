
const paper = require('paper/dist/paper-core');


window.onload = function() {
  console.log("script running");
  const canvas = document.getElementById('game');

  paper.setup(canvas);

  const { Path, Point, Size, Rectangle } = paper;

  canvas.height = 400;
  canvas.width = 400;

  var path = new Path();
  path.strokeColor = 'blue';
  var start = new Point(100, 100);
  path.moveTo(start);
  path.lineTo(start.add [ 200, -50 ]);


  let tileSize = new Size(50, 50);

  let map = [];
  map[0] = [0, 1, 0, 1, 0, 0, 0, 0];
  map[1] = [0, 1, 0, 1, 0, 0, 0, 0];
  map[2] = [0, 1, 0, 1, 0, 0, 0, 0];
  map[3] = [0, 1, 0, 1, 0, 0, 0, 0];
  map[4] = [0, 0, 1, 1, 0, 0, 0, 0];
  map[5] = [0, 0, 1, 1, 0, 0, 0, 0];
  map[6] = [0, 1, 0, 1, 0, 0, 0, 0];
  map[7] = [0, 1, 0, 1, 0, 0, 0, 0];
  map[8] = [0, 1, 0, 1, 0, 0, 0, 0];



  let tilesWide = canvas.width / tileSize.width;
  let tilesHigh = canvas.height / tileSize.height;

  for (i=0; i < tilesHigh; i++) {
    for (j=0; j < tilesWide; j++) {
      // console.log("i: ", i, "j: ", j);
      let tilePoint = new Point(j * tileSize.width, i * tileSize.height)
      // console.log("tilePoint: ", tilePoint);
      let tileRect = new Rectangle(tilePoint, tileSize);
      // console.log("tileRect: ", tileRect);
      let tilePath = new Path.Rectangle(tileRect);
      // console.log("tilePath: ", tilePath);
      let text = new paper.PointText(tilePoint);
      text.fillColor = 'black';
      text.content = `${i},${j}`;
      if (map[i][j] == 1) {
        tilePath.fillColor = 'red';
      }
      else {
        tilePath.fillColor = 'blue';
      }


      // console.log("tileswide: ", tilesWide);
      // console.log("tileshigh: ", tilesHigh);
    }

}



}



/*
* The idea here is to create a grid of 9 chunks of tiles using the perlin noise function.
* The chunks will be 9x9.
*/


function generateMap() {
  let map = [];
  map [0] = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1]]
  noise.seed(123);
  let perlinVal = 0;
  for (let i=0; i < 9; i++) {
    map[0][i] = [0];
    for (let j=0; j < 9; j++){
      perlinVal = noise.perlin2((i+1)/100, (j+1)/100) * 100;
      console.log("PerlinVal: ", perlinVal);
      if(perlinVal > 0) {
        map[0][i][j] = 1
      }
      else map[0][i][j] = 0;
    }
  }
  return map;
}

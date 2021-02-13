

/*
* The idea here is to create a grid of 9 chunks of tiles using the perlin noise function.
* The chunks will be 9x9.
*/


function generateMap() {
  let map = {
    startChunkX: 0,
    startChunkY: 0,
    chunkSize: 9,
    chunks: []
  };

  for (let i=0; i < map.chunkSize; i++) {
    map.chunks[i] = [];
    for (let j=0; j<map.chunkSize; j++){
      map.chunks[i][j] = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    }
  }
  noise.seed(123);
  let perlinVal = 0;
  for (let i=0; i < map.chunkSize; i++) {
    map.chunks[0][i] = [0];
    for (let j=0; j < map.chunkSize; j++){
      perlinVal = noise.perlin2((i+1)/100, (j+1)/100) * 100;
      console.log("PerlinVal: ", perlinVal);
      if(perlinVal > 0) {
        map.chunks[0][i][j] = 1
      }
      else map.chunks[0][i][j] = 0;
    }
  }
  return map;
}

/*
* Renders the new chunks and rearranges the map array according to the new starting point
*/
function renderChunks(map, startChunkX, startChunkY){}

/*
* Translates the tile map coordinate to the proper index in the
* map.chunks array
*/
function translateCoords(map, tileX, tileY)) {
  //find out which chunk the tile is in.
  let chunkX = Math.floor(tileX / (map.chunkSize -1));
  let chunkY = Math.floor(tileY / (map.chunkSize -1));

  //find out where this chunk is stored in the chunks array
  let chunkIndex = 0;
  if (chunkX < map.startChunkX + 3) {
    //we know the chunkIndex is between
  }

  (tileY % (map.chunkSize - 1));

  (tileX % (map.chunkSize - 1));
}

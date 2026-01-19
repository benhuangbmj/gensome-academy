import levelContext from "../contexts/levelContext";
let previousTilePos = null;
export default function mouseMoved(eventPos, item, approve) {
  approve(true);
  const level = levelContext.provide();
  const tile = level.adjustedPos2Tile(eventPos);
  if (JSON.stringify(tile) === JSON.stringify(previousTilePos)) {
    return;
  }
  previousTilePos = tile;
  function drawItemSprite(tile, item) {
    drawSprite(
      Object.assign(item.sprite, {
        pos: level.adjustedTile2Pos(tile),
      }),
    );
  }

  function drawBluePrint(tile) {
    const obstacle = level.getAt(tile).find((obj) => obj.isObstacle);
    obstacle && approve(false);
    drawRect({
      width: level.tileWidth(),
      height: level.tileHeight(),
      pos: level.adjustedTile2Pos(tile),
      color: obstacle ? RED : BLUE,
      opacity: 0.3,
    });
  }
  const drawOnTile = onDraw(() => {
    drawItemSprite(tile, item);
    const [h, w] = Object.values(item.size);
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        drawBluePrint(tile.add(vec2(x, y)));
      }
    }
    if (
      JSON.stringify(tile) != JSON.stringify(level.adjustedPos2Tile(mousePos()))
    ) {
      drawOnTile.cancel();
    }
  });
}

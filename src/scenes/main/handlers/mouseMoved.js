import levelContext from "../contexts/levelContext";
let previousTilePos = null;
export default function mouseMoved(eventPos, item, approve) {
  approve(true);
  const level = levelContext.provide();
  const tilePos = level.adjustedPos2Tile(eventPos);
  if (JSON.stringify(tilePos) === JSON.stringify(previousTilePos)) {
    return;
  }
  previousTilePos = tilePos;
  function drawItemSprite(tilePos, item) {
    drawSprite(
      Object.assign(item.sprite, {
        pos: level.adjustedTile2Pos(tilePos),
      }),
    );
  }

  function drawBluePrint(tilePos) {
    const obstacle = level.getAt(tilePos).find((obj) => obj.isObstacle);
    obstacle && approve(false);
    drawRect({
      width: level.tileWidth(),
      height: level.tileHeight(),
      pos: level.adjustedTile2Pos(tilePos),
      color: obstacle ? RED : BLUE,
      opacity: 0.3,
    });
  }
  const drawOnTile = onDraw(() => {
    drawItemSprite(tilePos, item);
    const [h, w] = Object.values(item.size);
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        drawBluePrint(tilePos.add(vec2(x, y)));
      }
    }
    if (
      JSON.stringify(tilePos) !=
      JSON.stringify(level.adjustedPos2Tile(mousePos()))
    ) {
      drawOnTile.cancel();
    }
  });
}

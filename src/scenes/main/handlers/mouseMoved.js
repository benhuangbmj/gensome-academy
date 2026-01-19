import levelContext from "../contexts/levelContext";
let previousTilePos = null;
export default function mouseMoved(eventPos, item) {
  const level = levelContext.provide();
  const tilePos = level.pos2Tile(eventPos.sub(level.pos));
  if (JSON.stringify(tilePos) === JSON.stringify(previousTilePos)) {
    return;
  }
  previousTilePos = tilePos;
  function drawItemSprite(tilePos, item) {
    drawSprite(
      Object.assign(item.sprite, {
        pos: level.tile2Pos(tilePos).add(level.pos),
      }),
    );
  }

  function drawBluePrint(tilePos) {
    const obstacle = level.getAt(tilePos).find((obj) => obj.isObstacle);
    drawRect({
      width: level.tileWidth(),
      height: level.tileHeight(),
      pos: level.tile2Pos(tilePos).add(level.pos),
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
      JSON.stringify(level.pos2Tile(mousePos().sub(level.pos)))
    ) {
      drawOnTile.cancel();
    }
  });
}

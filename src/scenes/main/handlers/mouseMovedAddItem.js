import levelContext from "../contexts/levelContext";
import utils from "../../../utils";
let previousTilePos = null;
export default function mouseMovedAddItem(eventPos, item, approve) {
  approve(true);
  const level = levelContext.provide();
  const tilePos = level.adjustedPos2Tile(eventPos);
  if (JSON.stringify(tilePos) === JSON.stringify(previousTilePos)) {
    return;
  }
  previousTilePos = tilePos;
  const drawOnTile = onDraw(() => {
    drawItemSprite(level, tilePos, item);
    utils.makeBySize(tilePos, item.size, (tilePos) =>
      drawBluePrint(level, tilePos, approve),
    );
    if (
      JSON.stringify(tilePos) !=
      JSON.stringify(level.adjustedPos2Tile(mousePos()))
    ) {
      drawOnTile.cancel();
    }
  });
}
function drawItemSprite(level, tilePos, item) {
  drawSprite(
    Object.assign(item.sprite, {
      pos: level.adjustedTile2Pos(tilePos),
    }),
  );
}
function drawBluePrint(level, tilePos, approve) {
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

import levelContext from "../contexts/levelContext";
import utils from "../../../utils";
let previousTilePos = null;
export default function mouseMovedAddItem(eventPos, approve, item) {
  item.size =
    item.size_w && item.size_h ? vec2(item.size_w, item.size_h) : vec2(1, 1);
  approve(false);
  const level = levelContext.provide();
  const tilePos = level.adjustedPos2Tile(eventPos);
  if (JSON.stringify(tilePos) === JSON.stringify(previousTilePos)) {
    return;
  }
  previousTilePos = tilePos;
  const drawOnTile = level.onDraw(() => {
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
    on("cancelDrawOnTile", "*", () => {
      drawOnTile.cancel();
    });
  });
}
function drawItemSprite(level, tilePos, item) {
  drawSprite(
    Object.assign(
      { sprite: item.sprite },
      {
        pos: level.tile2Pos(tilePos),
        width: level.tileWidth() * item.size.x,
        height: level.tileHeight() * item.size.y,
      },
    ),
  );
}
function drawBluePrint(level, tilePos, approve) {
  const objsAtTilePos = level.getAt(tilePos);
  const isApproved =
    objsAtTilePos.length > 0 &&
    !objsAtTilePos.find((obj) => obj.isObstacle || !obj.isAvailable);
  approve(isApproved);
  drawRect({
    width: level.tileWidth(),
    height: level.tileHeight(),
    pos: level.tile2Pos(tilePos),
    color: isApproved ? BLUE : RED,
    opacity: 0.3,
  });
}

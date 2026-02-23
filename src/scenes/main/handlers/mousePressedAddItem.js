import levelContext from "../contexts/levelContext";
import utils from "../../../utils";
//TODO: fix the argument structure to be consistent with mouseMovedAddItem
export default function mousePressedAddItem(
  btn,
  item,
  isApproved,
  callback = spawnItem,
) {
  item.size = vec2(item.size_w, item.size_h);
  const level = levelContext.provide();
  if (!isApproved || btn != "left") return;
  const tilePos = level.adjustedPos2Tile(mousePos());
  if (!callback) return;
  callback(level, tilePos, item);
  utils.makeBySize(tilePos, item.size, (tilePos) =>
    spawnBluePrint(level, tilePos),
  );
}
function spawnItem(level, tilePos, item) {
  level.spawn(
    [
      sprite(item.sprite, {
        width: item.size_w * level.tileWidth(),
        height: item.size_h * level.tileHeight(),
      }),
    ],
    tilePos,
  );
}
function spawnBluePrint(level, tilePos) {
  level.spawn([tile({ isObstacle: true })], tilePos);
}

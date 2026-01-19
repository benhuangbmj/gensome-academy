import levelContext from "../contexts/levelContext";
import utils from "../../../utils";
export default function mousePressedAddItem(btn, item, isApproved) {
  const level = levelContext.provide();
  if (!isApproved || btn != "left") return;
  const tilePos = level.adjustedPos2Tile(mousePos());
  level.spawn(
    [sprite(item.sprite.sprite, item.sprite), tile(item.tileOpt)],
    tilePos,
  );
  utils.makeBySize(tilePos, item.size, (tilePos) =>
    spawnBluePrint(level, tilePos, item),
  );
}
function spawnBluePrint(level, tilePos, item) {
  level.spawn([tile(item.tileOpt)], tilePos);
}

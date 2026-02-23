import levelContext from "../contexts/levelContext";
import utils from "../../../utils";
import dataContext from "../contexts/dataContext";
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
      {
        add() {
          console.log("tags", this.tags);
        },
      },
      ...makeTags(item),
    ],
    tilePos,
  );
}
function spawnBluePrint(level, tilePos) {
  level.spawn([tile({ isObstacle: true })], tilePos);
}
function makeTags(facility) {
  const facilityId = facility.id;
  const data = dataContext.provide();
  let isSite = false;
  const statusIds = data.facilityStatus
    .filter((record) => record.facility_id == facilityId)
    .map((record) => {
      record.site && (isSite = true);
      return record.status_id;
    });
  const tags = data.status
    .filter((record) => statusIds.includes(record.id))
    .map((record) => record.name);
  isSite && tags.push("site");
  return tags;
}

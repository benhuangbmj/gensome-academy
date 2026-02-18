import runtimeContext from "./scenes/main/contexts/runtimeContext";
function snapToTileCenter({ level, position }) {
  const tilePos = level.pos2Tile(position);
  const tileWorldPos = level.tile2Pos(tilePos);
  const output = vec2(
    tileWorldPos.x + 0.5 * level.tileWidth(),
    tileWorldPos.y + 0.5 * level.tileHeight(),
  );
  return output;
}
function chase(subject, target) {
  return subject.onUpdate(() => {
    subject.setTarget(target.pos);
  });
}
function adjustPosition(obj, cb = () => {}) {
  const currentTile = obj.tilePos;
  const myLevel = obj.getLevel();
  myLevel.invalidateNavigationMap();
  const [TILE_WIDTH, TILE_HEIGHT] = [myLevel.tileWidth(), myLevel.tileHeight()];
  const currentPos = myLevel.tile2Pos(currentTile);
  const targetPos = [
    currentPos.x + TILE_WIDTH / 2,
    currentPos.y + TILE_HEIGHT / 2,
  ];
  obj.unuse("body");
  obj.setTarget(vec2(...targetPos));
  const onAdjustFinished = obj.onTargetReached(() => {
    obj.use(body());
    cb();
    onAdjustFinished.cancel();
  });
}
function playDirectionAnim({
  character,
  currDirection,
  eventController,
  endFrame = 0,
}) {
  const currPosition = character.pos;
  const nextPosition = character.getNextLocation();
  function getDirection(currPos, nextPos) {
    if (nextPos == null) {
      eventController?.cancel();
      character.stop();
      character.frame = endFrame;
      return null;
    }
    const { x: currX, y: currY } = currPos;
    const { x: nextX, y: nextY } = nextPos;
    const deltaX = nextX - currX;
    const deltaY = nextY - currY;
    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
      if (deltaX > 0) return "right";
      if (deltaX < 0) return "left";
    } else {
      if (deltaY > 0) return "down";
      if (deltaY < 0) return "up";
    }
    return null;
  }
  const direction = getDirection(currPosition, nextPosition);
  if (
    direction != null &&
    (direction != currDirection || !character.getCurAnim())
  ) {
    character.play(direction);
    return direction;
  } else return currDirection;
}
function makeBySize(tilePos, size, callback) {
  const [h, w] = Object.values(size);
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      callback(tilePos.add(vec2(y, x)));
    }
  }
}
function registerMouseEvents(mouseMovedHandler, mousePressedHandler) {
  const runtime = runtimeContext.provide();
  if (runtime.mouseMovedEvent) {
    runtime.mouseMovedEvent.cancel();
  }
  if (runtime.mousePressedEvent) {
    runtime.mousePressedEvent.cancel();
  }
  const mouseReleaseController = onMouseRelease(() => {
    runtime.mouseMovedEvent = onMouseMove(mouseMovedHandler);
    runtime.mousePressedEvent = onMousePress(mousePressedHandler);
    mouseReleaseController.cancel();
  });
}
export default {
  snapToTileCenter,
  chase,
  adjustPosition,
  playDirectionAnim,
  makeBySize,
  registerMouseEvents,
};

let camChanged;
export default function levelUtils() {
  if (!camChanged) {
    camChanged = vec2(0, 0);
  }
  onKeyDown((key) => {
    if (key == "right") {
      camChanged = camChanged.add(vec2(10, 0));
    }
    if (key == "left") {
      camChanged = camChanged.sub(vec2(10, 0));
    }
    if (key == "up") {
      camChanged = camChanged.sub(vec2(0, 10));
    }
    if (key == "down") {
      camChanged = camChanged.add(vec2(0, 10));
    }
  });
  return {
    id: "level-utils",
    require: ["level", "pos"],
    adjustedPos2Tile(pos) {
      return this.pos2Tile(pos.add(camChanged).sub(this.pos));
    },
    adjustedTile2Pos(tile) {
      return this.tile2Pos(tile).add(this.pos);
    },
  };
}

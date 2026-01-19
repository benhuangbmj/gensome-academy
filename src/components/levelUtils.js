export default function levelUtils() {
  return {
    id: "level-utils",
    require: ["level", "pos"],
    adjustedPos2Tile(pos) {
      return this.pos2Tile(pos.sub(this.pos));
    },
    adjustedTile2Pos(tile) {
      return this.tile2Pos(tile).add(this.pos);
    },
  };
}

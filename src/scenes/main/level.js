import levelUtils from "../../components/levelUtils";
export default function makeMainLevel({ TILE_WIDTH, TILE_HEIGHT }) {
  const levelMap = [
    "--------------",
    "|            |",
    "|            |",
    "|            |",
    "|            |",
    "|            |",
    "|             ",
    "|            |",
    "|            |",
    "|            |",
    "|            |",
    "--------------",
  ];
  const mainLevelComp = level(levelMap, {
    tileWidth: TILE_WIDTH,
    tileHeight: TILE_HEIGHT,
    tiles: {
      "-": () => [
        sprite("steel", { width: TILE_WIDTH }),
        area(),
        body({ isStatic: true }),
        tile({ isObstacle: true }),
        z(-1),
      ],
      "|": () => [
        sprite("steel", { width: TILE_WIDTH }),
        area(),
        body({ isStatic: true }),
        tile({ isObstacle: true }),
        z(-1),
      ],
      " ": () => [sprite("floor", { width: TILE_WIDTH }), z(-1)],
    },
  });
  return add([mainLevelComp, pos(0, 80), levelUtils(), "main-level"]);
}

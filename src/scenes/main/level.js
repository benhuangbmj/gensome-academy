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
        sprite("steel"),
        area(),
        body({ isStatic: true }),
        tile({ isObstacle: true }),
      ],
      "|": () => [
        sprite("steel"),
        area(),
        body({ isStatic: true }),
        tile({ isObstacle: true }),
      ],
      " ": () => [sprite("floor", { width: TILE_WIDTH })],
    },
  });
  return add([mainLevelComp, pos(0, 80), levelUtils(), "main-level"]);
}

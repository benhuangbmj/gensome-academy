import levelUtils from "../../components/levelUtils";
import available from "../../components/available";
export default function makeMainLevel({ TILE_WIDTH, TILE_HEIGHT }) {
  const levelMap = [
    "--------------",
    "|************|",
    "|************|",
    "|************|",
    "|************|",
    "|*************",
    "|************|",
    "|************|",
    "|************|",
    "|************|",
    "|************|",
    "--------------",
  ];
  //issue: padding spaces here to avoid out of bound error. There may be a bug in the engine for levelComp.getAt().
  levelMap.forEach((r, i, arr) => {
    arr[i] = r + "                                        ";
  });
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
      "*": () => [sprite("floor", { width: TILE_WIDTH }), z(-1), available()],
      " ": () => [available(false)],
    },
  });
  return add([mainLevelComp, pos(0, 80), levelUtils(), "main-level"]);
}

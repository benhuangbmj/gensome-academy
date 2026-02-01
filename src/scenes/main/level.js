import levelUtils from "../../components/levelUtils";
import available from "../../components/available";
export default function makeMainLevel({ TILE_WIDTH, TILE_HEIGHT }) {
  const levelMap = [
    "--------------",
    "|************|",
    "|************|",
    "|************|",
    "|************|",
    "|***********WE",
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
      E: () => [
        sprite("floor", { width: TILE_WIDTH }),
        z(-1),
        available(false),
        "exit",
      ],
      W: () => [
        sprite("floor", { width: TILE_WIDTH }),
        z(-1),
        available(false),
        "wait",
      ],
    },
  });
  onAdd("main-level", (obj) => {
    obj.spawn(
      [sprite("sparkling", { anim: "anim", height: obj.tileHeight() })],
      obj.get("wait")[0].tilePos,
    );
  });
  return add([mainLevelComp, pos(0, 80), levelUtils(), "main-level"]);
}

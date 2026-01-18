import utils from "/src/utils.js";
export default function makeMainLevel({ TILE_WIDTH, TILE_HEIGHT }) {
  debug.log("Making main level", time());
  const levelMap = [
    "----------------",
    "|              |",
    "|              |",
    "|              |",
    "|              |",
    "|              |",
    "|              |",
    "|               ",
    "|              |",
    "|              |",
    "|              |",
    "|              |",
    "|              |",
    "----------------",
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
  onAdd("main-level", (mainLevelComp) => {
    mainLevelComp.spawn(
      [
        sprite("card-table", { frame: 2, width: TILE_WIDTH * 3.5 }),
        anchor("center"),
        pos(TILE_WIDTH / 2, TILE_HEIGHT / 2),
      ],
      vec2(5, 5),
    );
    const girl = mainLevelComp.spawn(
      [
        sprite("girl", { frame: 0, width: TILE_WIDTH }),
        anchor("center"),
        pos(TILE_WIDTH / 2, TILE_HEIGHT / 2),
        agent({ speed: 300, allowDiagonals: false }),
      ],
      vec2(15, 7),
    );
    girl.play("left");
    girl.setTarget(mainLevelComp.tile2Pos(vec2(6, 4)));
    let currDirection;
    const updateAnim = girl.onUpdate(() => {
      currDirection = utils.playDirectionAnim({
        character: girl,
        currDirection,
        eventController: updateAnim,
      });
    });
  });
  return add([mainLevelComp, pos(0, 80), "main-level"]);
}

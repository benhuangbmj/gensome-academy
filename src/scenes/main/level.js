export default function makeMainLevel({ TILE_WIDTH, TILE_HEIGHT }) {
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
  });
  return add([mainLevelComp, pos(0, 80), "main-level"]);
}

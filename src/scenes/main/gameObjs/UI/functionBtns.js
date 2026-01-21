import UIContext from "../../contexts/UIContext";
const btnData = [
  { tag: "hire", sprite: "paper" },
  { tag: "purchase", sprite: "toolbox" },
  { tag: "practice", sprite: "pencil" },
];
export default function functionBtns(user) {
  const UISpecs = UIContext.provide();
  const SCALE = 1.5;
  const BTN_WIDTH = UISpecs.TILE_WIDTH * SCALE;
  const BTN_HEIGHT = UISpecs.TILE_HEIGHT * SCALE;
  const [menuWidth, menuHeight] = [9 * BTN_WIDTH, 3 * BTN_HEIGHT];
  const [menuPosX, menuPosY] = [
    width() - BTN_WIDTH - UISpecs.GAP - 4,
    height() - UISpecs.GAP,
  ];
  const menuLeft = menuPosX - menuWidth;
  const menuDividerHeight = menuPosY - (1 / 3) * menuHeight;
  let menuOpened = false;
  let drawMenuEvent;
  //const TEXT_SIZE = BTN_HEIGHT / 6;
  btnData.forEach((btn, i) => {
    const btnContainer = add([
      rect(BTN_WIDTH, BTN_HEIGHT),
      pos(
        width() - BTN_WIDTH - UISpecs.GAP,
        height() - (i + 1) * BTN_HEIGHT - UISpecs.GAP,
      ),
      area(),
      fixed(),
      outline(4),
    ]);
    btnContainer.add([
      sprite(btn.sprite, { width: UISpecs.TILE_WIDTH }),
      pos(
        (BTN_WIDTH - UISpecs.TILE_WIDTH) / 2,
        (BTN_HEIGHT - UISpecs.TILE_HEIGHT) / 2,
      ),
      area(),
    ]);
    btnContainer.onClick(() => {
      openMenu();
    });
    //   .add([
    //     text(btn.tag, { size: TEXT_SIZE }),
    //     color(BLACK),
    //     pos((BTN_WIDTH - btn.tag.length * 7) / 2, (BTN_HEIGHT - TEXT_SIZE) / 2),
    //   ]);
  });
  //Icon creation
  const menuContainer = add([
    rect(menuWidth, menuHeight),
    pos(menuPosX, menuPosY),
    fixed(),
    anchor("botright"),
    outline(4),
  ]);
  createMenuIcons(); //test only

  function createMenuIcons() {
    (menuContainer.add([
      sprite("play", { width: UISpecs.TILE_WIDTH }),
      pos(
        -(BTN_WIDTH - UISpecs.TILE_WIDTH) / 2,
        -3 * BTN_HEIGHT + (2 * BTN_HEIGHT - UISpecs.TILE_HEIGHT) / 2,
      ),
      anchor("topright"),
      area(),
    ]),
      menuContainer.add([
        sprite("play", { width: UISpecs.TILE_WIDTH, flipX: true }),
        pos(
          -(BTN_WIDTH - UISpecs.TILE_WIDTH) / 2 - 8 * BTN_WIDTH,
          -3 * BTN_HEIGHT + (2 * BTN_HEIGHT - UISpecs.TILE_HEIGHT) / 2,
        ),
        anchor("topright"),
        area(),
      ]),
      openMenu()); //test only
  }
  function openMenu() {
    //TODO: refine the control. When the user click on different keys, the different menu should show up
    if (menuOpened) {
      menuOpened = false;
      drawMenuEvent.cancel();
      return;
    } else {
      menuOpened = true;
      drawMenuEvent = menuContainer.onDraw(() => {
        //TODO: refactor and see if the dimensions can be simplified or unified
        drawLine({
          p1: vec2(0, -BTN_HEIGHT),
          p2: vec2(-menuWidth, -BTN_HEIGHT),
          width: 2,
          color: BLACK,
          fixed: true,
        });
        for (let i = 1; i <= 8; i++) {
          drawLine({
            p1: vec2(-i * BTN_WIDTH, -BTN_HEIGHT),
            p2: vec2(-i * BTN_WIDTH, -3 * BTN_HEIGHT),
            width: 2,
            color: BLACK,
            fixed: true,
          });
        }
        drawLine({
          p1: vec2(-BTN_WIDTH, -2 * BTN_HEIGHT + 1),
          p2: vec2(-8 * BTN_WIDTH, -2 * BTN_HEIGHT + 1),
          width: 2,
          color: BLACK,
          fixed: true,
        });
      });
    }
  }
}

import UIContext from "../../../../contexts/UIContext";
const btnData = [
  { tag: "personnel", sprite: "paper" },
  { tag: "facilities", sprite: "toolbox" },
  { tag: "practices", sprite: "pencil" },
];
export default function functionBtns(handler) {
  const UISpecs = UIContext.provide();
  const SCALE = UISpecs.SCALE;
  const BTN_WIDTH = UISpecs.TILE_WIDTH * SCALE;
  const BTN_HEIGHT = UISpecs.TILE_HEIGHT * SCALE;
  const [menuWidth, menuHeight] = [
    UISpecs.MENU_COLS * BTN_WIDTH,
    UISpecs.MENU_ROWS * BTN_HEIGHT,
  ];
  const [menuPosX, menuPosY] = [
    width() - BTN_WIDTH - UISpecs.GAP - UISpecs.OUTLINE_WIDTH,
    height() - UISpecs.GAP,
  ];
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
      btn.tag,
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
      handler(btn.tag);
    });
    //   .add([
    //     text(btn.tag, { size: TEXT_SIZE }),
    //     color(BLACK),
    //     pos((BTN_WIDTH - btn.tag.length * 7) / 2, (BTN_HEIGHT - TEXT_SIZE) / 2),
    //   ]);
  });
}

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
      //Bug: fixed component not working with onClick unless camera is moved away.
      openMenu();
    });
    //   .add([
    //     text(btn.tag, { size: TEXT_SIZE }),
    //     color(BLACK),
    //     pos((BTN_WIDTH - btn.tag.length * 7) / 2, (BTN_HEIGHT - TEXT_SIZE) / 2),
    //   ]);
  });
  function openMenu() {
    if (menuOpened) {
      menuOpened = false;
      drawMenuEvent.cancel();
      return;
    } else {
      menuOpened = true;
      drawMenuEvent = onDraw(() => {
        drawRect({
          width: 9 * BTN_WIDTH,
          height: 3 * BTN_HEIGHT,
          anchor: "botright",
          fixed: true,
          outline: { width: 4, color: BLACK },
          pos: vec2(
            width() - BTN_WIDTH - UISpecs.GAP - 4,
            height() - UISpecs.GAP,
          ),
        });
      });
    }
  }
}

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
  //const TEXT_SIZE = BTN_HEIGHT / 6;
  btnData.forEach((btn, i) => {
    add([
      rect(BTN_WIDTH, BTN_HEIGHT),
      pos(
        width() - BTN_WIDTH - UISpecs.GAP,
        height() - (i + 1) * BTN_HEIGHT - UISpecs.GAP,
      ),
      fixed(),
      outline(4),
    ])
      .add([])
      .add([
        sprite(btn.sprite, { width: UISpecs.TILE_WIDTH }),
        pos(
          (BTN_WIDTH - UISpecs.TILE_WIDTH) / 2,
          (BTN_HEIGHT - UISpecs.TILE_HEIGHT) / 2,
        ),
      ]);
    //   .add([
    //     text(btn.tag, { size: TEXT_SIZE }),
    //     color(BLACK),
    //     pos((BTN_WIDTH - btn.tag.length * 7) / 2, (BTN_HEIGHT - TEXT_SIZE) / 2),
    //   ]);
  });
}

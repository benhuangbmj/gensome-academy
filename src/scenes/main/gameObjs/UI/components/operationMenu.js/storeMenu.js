import UIContext from "../../../../contexts/UIContext";
import dataContext from "../../../../contexts/dataContext";
const itemData = dataContext.provide();
export default function storeMenu(btnTag) {
  let page = 1;
  const UISpecs = UIContext.provide();
  const menuContainer = generateMenuContainer(UISpecs);
  generateGrids(menuContainer, UISpecs);
  generatePageControls(menuContainer, UISpecs);
  generateCatalog(menuContainer, btnTag, page, UISpecs);
  return menuContainer;
}

function generateCatalog(menuContainer, btnTag, page, UISpecs) {
  if (btnTag in itemData) {
    const catalogData = itemData[btnTag];
    let start = (UISpecs.MENU_ROWS - 1) * (UISpecs.MENU_COLS - 2) * (page - 1);
    for (
      let i = start;
      i < (UISpecs.MENU_ROWS - 1) * (UISpecs.MENU_COLS - 2) * page &&
      i < catalogData.length - 1;
      i++
    ) {
      menuContainer.add([
        rect(UISpecs.BTN_WIDTH, UISpecs.BTN_HEIGHT),
        pos(calcIconPos(i)),
        area(),
      ]);
    }
  }

  function calcIconPos(i) {
    const row = Math.floor(i / (UISpecs.MENU_COLS - 2));
    const col = i % (UISpecs.MENU_COLS - 2);
    return vec2(
      -UISpecs.MENU_WIDTH + UISpecs.BTN_WIDTH + col * UISpecs.BTN_WIDTH,
      //(UISpecs.BTN_WIDTH - UISpecs.TILE_WIDTH) / 2,
      -UISpecs.MENU_HEIGHT + row * UISpecs.BTN_HEIGHT,
      //(UISpecs.BTN_HEIGHT - UISpecs.TILE_HEIGHT) / 2,
    );
  }
}
function generateMenuContainer(UISpecs) {
  return add([
    rect(UISpecs.MENU_WIDTH, UISpecs.MENU_HEIGHT),
    pos(UISpecs.MENU_POS_X, UISpecs.MENU_POS_Y),
    fixed(),
    anchor("botright"),
    outline(UISpecs.OUTLINE_WIDTH),
  ]);
}
function generatePageControls(menuContainer, UISpecs) {
  menuContainer.add([
    sprite("play", { width: UISpecs.TILE_WIDTH }),
    pos(
      -(UISpecs.BTN_WIDTH - UISpecs.TILE_WIDTH) / 2,
      -UISpecs.MENU_ROWS * UISpecs.BTN_HEIGHT +
        ((UISpecs.MENU_ROWS - 1) * UISpecs.BTN_HEIGHT - UISpecs.TILE_HEIGHT) /
          2,
    ),
    anchor("topright"),
    area(),
  ]);
  menuContainer.add([
    sprite("play", { width: UISpecs.TILE_WIDTH, flipX: true }),
    pos(
      -(UISpecs.BTN_WIDTH - UISpecs.TILE_WIDTH) / 2 -
        (UISpecs.MENU_COLS - 1) * UISpecs.BTN_WIDTH,
      -UISpecs.MENU_ROWS * UISpecs.BTN_HEIGHT +
        ((UISpecs.MENU_ROWS - 1) * UISpecs.BTN_HEIGHT - UISpecs.TILE_HEIGHT) /
          2,
    ),
    anchor("topright"),
    area(),
  ]);
}
function generateGrids(menuContainer, UISpecs) {
  const GRID_LINE_WIDTH = 2;
  menuContainer.onDraw(() => {
    drawLine({
      p1: vec2(0, -UISpecs.BTN_HEIGHT),
      p2: vec2(-UISpecs.MENU_WIDTH, -UISpecs.BTN_HEIGHT),
      width: GRID_LINE_WIDTH,
      color: BLACK,
      fixed: true,
    });
    for (let i = 1; i < UISpecs.MENU_COLS; i++) {
      drawLine({
        p1: vec2(-i * UISpecs.BTN_WIDTH, -UISpecs.BTN_HEIGHT),
        p2: vec2(
          -i * UISpecs.BTN_WIDTH,
          -UISpecs.MENU_ROWS * UISpecs.BTN_HEIGHT,
        ),
        width: GRID_LINE_WIDTH,
        color: BLACK,
        fixed: true,
      });
    }
    drawLine({
      p1: vec2(-UISpecs.BTN_WIDTH, -2 * UISpecs.BTN_HEIGHT + 1),
      p2: vec2(
        -(UISpecs.MENU_COLS - 1) * UISpecs.BTN_WIDTH,
        -2 * UISpecs.BTN_HEIGHT + 1,
      ),
      width: GRID_LINE_WIDTH,
      color: BLACK,
      fixed: true,
    });
  });
}

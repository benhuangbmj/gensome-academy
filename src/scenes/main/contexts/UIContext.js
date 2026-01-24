let UISpecs;
function create(context) {
  const { TILE_WIDTH, TILE_HEIGHT, GAP } = context;
  context.OUTLINE_WIDTH = 4;
  context.SCALE = 1.5;
  context.MENU_COLS = 9;
  context.MENU_ROWS = 3;
  context.BTN_WIDTH = TILE_WIDTH * context.SCALE;
  context.BTN_HEIGHT = TILE_HEIGHT * context.SCALE;
  [context.MENU_WIDTH, context.MENU_HEIGHT] = [
    context.MENU_COLS * context.BTN_WIDTH,
    context.MENU_ROWS * context.BTN_HEIGHT,
  ];
  [context.MENU_POS_X, context.MENU_POS_Y] = [
    width() - context.BTN_WIDTH - GAP - context.OUTLINE_WIDTH,
    height() - GAP,
  ];
  context.GRID_LINE_WIDTH = 2;
  UISpecs = context;
}
function provide() {
  return UISpecs;
}
export default {
  create,
  provide,
};

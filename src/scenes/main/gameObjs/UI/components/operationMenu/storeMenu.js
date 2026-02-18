import UIContext from "../../../../contexts/UIContext";
import dataContext from "../../../../contexts/dataContext";
import handlers from "../../../../handlers/handlers";
import progress from "../../../../../../components/progress";
import userContext from "../../../../contexts/userContext";
import factory from "../../../factory/factory";
import levelContext from "../../../../contexts/levelContext";
import runtimeContext from "../../../../contexts/runtimeContext";
const itemData = dataContext.provide();
let { mouseMovedEvent, mousePressedEvent } = runtimeContext.provide();
export default function storeMenu(btnTag) {
  let page = 1;
  const UISpecs = UIContext.provide();
  const menuContainer = generateMenuContainer(UISpecs);
  generateGrids(menuContainer, UISpecs);
  generatePageControls(menuContainer, UISpecs);
  generateCatalog(menuContainer, btnTag, page, UISpecs);
  menuContainer.onHover(() => {
    if (mousePressedEvent) {
      mousePressedEvent.paused = true;
    }
  });
  menuContainer.onHoverEnd(() => {
    if (mousePressedEvent) {
      mousePressedEvent.paused = false;
    }
  });
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
      const item = catalogData[i];
      const itemBtn = menuContainer.add([
        rect(
          UISpecs.BTN_WIDTH - UISpecs.GRID_LINE_WIDTH,
          UISpecs.BTN_HEIGHT - UISpecs.GRID_LINE_WIDTH,
        ),
        pos(calcIconPos(i)),
        area(),
        fixed(),
      ]);
      attachHandler(btnTag, item, itemBtn);
      function attachHandler(btnTag, item, itemBtn) {
        switch (btnTag) {
          case "facilities":
            facilityBtnHandler(item, itemBtn);
            break;
          case "practices":
            practiceBtnHandler(item, itemBtn);
            break;
          case "personnel":
            personnelBtnHandler(item, itemBtn);
            break;
        }
      }
      function personnelBtnHandler(item, itemBtn) {
        function mouusePressedAddPersonnel(btn, item) {
          if (btn != "left") return;
          const user = userContext.provide();
          if (user.cash < item.salary || user.FP < item.FP_cost) return;
          const level = levelContext.provide();
          const personnelTypes = [];
          item.secretary && personnelTypes.push("secretary");
          item.tutor && personnelTypes.push("tutor");
          const personnelOpt = {
            sprite: item.sprite,
            width: UISpecs.TILE_WIDTH,
            states: [
              "idle",
              "check-in",
              "teaching",
              "check-out",
              "reserved",
              "resumed",
            ],
            salary: item.salary,
            efficiency: item.efficiency,
            rate: item.rate,
            type: personnelTypes,
            tilePos: level.adjustedPos2Tile(mousePos()),
          };
          const personnel = factory.createWorker(level, personnelOpt);
          personnel.play("anim");
          user.cash -= item.salary;
          user.FP -= item.FP_cost;
        }
        itemBtn.onDraw(() => {
          drawSprite({
            sprite: item.sprite,
            width: UISpecs.TILE_WIDTH,
            pos: vec2(
              (UISpecs.BTN_WIDTH - UISpecs.TILE_WIDTH) / 2,
              (UISpecs.BTN_HEIGHT - UISpecs.TILE_HEIGHT) / 2,
            ),
          });
        });
        itemBtn.onClick(() => {
          const mouseReleaseController = onMouseRelease(() => {
            const mousePressController = onMousePress((btn) => {
              mouusePressedAddPersonnel(btn, item);
              mousePressController.cancel();
            });
            mouseReleaseController.cancel();
          });
        });
      }
      function practiceBtnHandler(item, itemBtn) {
        itemBtn.onDraw(() => {
          drawText({
            text: item.name,
            size: 24,
            width: UISpecs.BTN_WIDTH,
            color: BLACK,
            pos: vec2(
              (UISpecs.BTN_WIDTH - 24) / 2,
              (UISpecs.BTN_HEIGHT - 24) / 2,
            ),
          });
        });
        itemBtn.onClick(() => {
          add([
            rect(300, 100),
            outline(4),
            fixed(),
            {
              add() {
                this.use(
                  progress(item.duration, {
                    offset: vec2((this.width - 120) / 2, (this.height - 6) / 2),
                    onProgressDestroyed: () => {
                      const user = userContext.provide();
                      user.FP += item.FP_rate;
                      user.MP += item.MP_rate;
                    },
                  }),
                  this.use(pos((width() - this.width) / 2, UISpecs.GAP)),
                );
              },
            },
          ]);
        });
      }
      function facilityBtnHandler(item, itemBtn) {
        itemBtn.onDraw(() => {
          drawSprite({
            sprite: item.sprite,
            width: UISpecs.TILE_WIDTH,
            pos: vec2(
              (UISpecs.BTN_WIDTH - UISpecs.TILE_WIDTH) / 2,
              (UISpecs.BTN_HEIGHT - UISpecs.TILE_HEIGHT) / 2,
            ),
          });
        });
        itemBtn.onClick(() => {
          handlers.addItem(item);
        });
      }
    }
  }

  function calcIconPos(i) {
    const row = Math.floor(i / (UISpecs.MENU_COLS - 2));
    const col = i % (UISpecs.MENU_COLS - 2);
    return vec2(
      -UISpecs.MENU_WIDTH +
        UISpecs.BTN_WIDTH +
        col * UISpecs.BTN_WIDTH +
        (1 / 2) * UISpecs.GRID_LINE_WIDTH,
      -UISpecs.MENU_HEIGHT + row * UISpecs.BTN_HEIGHT + UISpecs.GRID_LINE_WIDTH,
    );
  }
}
function generateMenuContainer(UISpecs) {
  return add([
    rect(UISpecs.MENU_WIDTH, UISpecs.MENU_HEIGHT),
    pos(UISpecs.MENU_POS_X, UISpecs.MENU_POS_Y),
    area(),
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
  menuContainer.onDraw(() => {
    drawLine({
      p1: vec2(0, -UISpecs.BTN_HEIGHT),
      p2: vec2(-UISpecs.MENU_WIDTH, -UISpecs.BTN_HEIGHT),
      width: UISpecs.GRID_LINE_WIDTH,
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
        width: UISpecs.GRID_LINE_WIDTH,
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
      width: UISpecs.GRID_LINE_WIDTH,
      color: BLACK,
      fixed: true,
    });
  });
}

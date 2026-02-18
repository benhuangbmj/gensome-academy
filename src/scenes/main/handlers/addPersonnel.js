import utils from "../../../utils";
import handlers from "./handlers";
import userContext from "../contexts/userContext";
import levelContext from "../contexts/levelContext";
import factory from "../gameObjs/factory/factory";
export default function addPersonnel(item) {
  let isApproved = false;
  utils.registerMouseEvents(
    (eventPos) =>
      handlers.mouseMovedAddItem(
        eventPos,
        (value) => {
          isApproved = value;
        },
        item,
      ),
    (btn) => {
      mousePressedAddPersonnel(btn, item, isApproved);
    },
    () => {
      trigger("cancelDrawOnTile", "*");
    },
  );
}

function mousePressedAddPersonnel(btn, item) {
  if (btn != "left") return;
  const user = userContext.provide();
  if (user.cash < item.salary || user.FP < item.FP_cost) return;
  const level = levelContext.provide();
  const personnelTypes = [];
  item.secretary && personnelTypes.push("secretary");
  item.tutor && personnelTypes.push("tutor");
  const personnelOpt = {
    sprite: item.sprite,
    width: level.tileWidth(),
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

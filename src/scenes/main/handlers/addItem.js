import utils from "../../../utils";
import handlers from "./handlers";
export default function addItem(item) {
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
      handlers.mousePressedAddItem(btn, item, isApproved);
    },
  );
}

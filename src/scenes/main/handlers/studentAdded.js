import findSecretary from "../utils/findSecretary";
import moveToSec from "../utils/moveToSec";
import config from "../../../config";
export default function studentAdded(obj) {
  const loopController = findSecretary(obj, "check-in", [obj], moveToSec(obj));
  if (!obj.customerIsReturning)
    wait(30, () => {
      if (obj.state === "idle") {
        loopController.cancel();
        obj.enterState("dismissed", obj);
      }
    });
  else {
    obj.use(color((obj.customerPerformance * 255) / 100, 0, 0));
    obj.onUpdate(() => {
      obj.color.r = (obj.customerPerformance * 255) / 100;
    });
  }
}
//TODO: rewrite the waiting logic: put the customer in a queue, and serve one at a time

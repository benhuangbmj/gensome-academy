import findSecretary from "../utils/findSecretary";
import moveToSec from "../utils/moveToSec";
export default function studentAdded(obj) {
  const loopController = findSecretary("check-in", [obj], moveToSec(obj), {
    isNew: true,
  });
  wait(20, () => {
    if (obj.state === "idle") {
      loopController.cancel();
      obj.enterState("dismissed", obj);
    }
  });
}

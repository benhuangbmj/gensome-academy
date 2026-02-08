import findSecretary from "../utils/findSecretary";
import moveToSec from "../utils/moveToSec";
import config from "../../../config";
export default function studentAdded(obj) {
  const loopController = findSecretary("check-in", [obj], moveToSec(obj));
  if (!obj.customerIsReturning)
    wait(20 * config.TIME_FLOW_RATE, () => {
      if (obj.state === "idle") {
        loopController.cancel();
        obj.enterStatus("dismissed", obj);
      }
    });
  else obj.use(color(RED));
}

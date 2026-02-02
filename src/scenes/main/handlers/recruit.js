import factory from "../gameObjs/factory/factory";
import levelContext from "../contexts/levelContext";
import config from "../../../config";
let isRecruiting = false;
let recruitLoop;
export default function recruit(key) {
  if (key !== "r") return;
  const level = levelContext.provide();
  isRecruiting = !isRecruiting;
  if (isRecruiting) {
    debug.log("Start to recruit...");
    recruitLoop = loop(90 * config.TIME_FLOW_RATE, () => {
      factory.createCustomer(level);
    });
  } else {
    debug.log("Stop recruiting.");
    if (recruitLoop) {
      recruitLoop.cancel();
      recruitLoop = null;
    }
  }
}

import config from "../../../config";
import activity from "../../../components/activity";
import progress from "../../../components/progress";
export default function checkIn(secretary, student) {
  const duration = (1 * config.TIME_FLOW_RATE) / secretary.workerEfficiency;
  secretary.add([
    pos(),
    activity({
      duration,
      actor: secretary,
      target: student,
      type: "check-in",
      effect: (actor, target) => {
        target.enterState("matching");
      },
    }),
    progress(duration, {
      width: secretary.width,
      onProgressFinished: (obj) => obj.destroy(),
    }),
  ]);
}

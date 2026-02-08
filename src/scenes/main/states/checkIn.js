import config from "../../../config";
import activity from "../../../components/activity";
import progress from "../../../components/progress";
export default function checkIn(secretary, student, opt) {
  const duration = (5 * config.TIME_FLOW_RATE) / secretary.workerEfficiency;
  secretary.add([
    pos(),
    activity({
      actor: secretary,
      target: student,
      type: "check-in",
      effect: (actor, target) => {
        opt?.isNew && target.enterStatus("matching", student);
      },
    }),
    progress(duration, {
      width: secretary.width,
    }),
    "check-in",
  ]);
}

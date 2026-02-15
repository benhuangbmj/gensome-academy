import userContext from "../contexts/userContext";
import config from "../../../config";
import activity from "../../../components/activity";
import progress from "../../../components/progress";
import levelContext from "../contexts/levelContext";
export default function checkOut(secretary, tutor, student) {
  const user = userContext.provide();
  const level = levelContext.provide();
  const duration = (5 * config.TIME_FLOW_RATE) / secretary.workerEfficiency;
  secretary.add([
    pos(),
    activity({
      actor: secretary,
      target: student,
      type: "check-out",
      effect: (actor, target) => {
        user.cash += tutor?.workerRate ?? 0;
        target?.setTarget(level.get("exit")[0]?.pos);
        target?.onTargetReached(() => {
          wait(2, () => {
            target?.destroy();
          });
        });
      },
    }),
    progress(duration, {
      width: secretary.width,
    }),
    "check-out",
  ]);
}

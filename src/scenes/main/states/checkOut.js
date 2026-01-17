import userContext from "../contexts/userContext";
import config from "../../../config";
import activity from "../../../components/activity";
import progress from "../../../components/progress";
export default function checkOut(secretary, tutor, student) {
  const user = userContext.provide();
  const duration = (5 * config.TIME_FLOW_RATE) / secretary.workerEfficiency;
  secretary.add([
    pos(),
    activity({
      actor: secretary,
      target: student,
      type: "check-out",
      effect: (actor, target) => {
        user.cash += tutor.workerRate;
        target.destroy();
        actor.enterState("idle");
      },
    }),
    progress(duration, {
      width: secretary.width,
    }),
  ]);
}

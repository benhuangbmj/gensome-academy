import config from "../../../config";
import activity from "../../../components/activity";
import progress from "../../../components/progress";
export default function teaching(tutor, student) {
  const duration = (60 * config.TIME_FLOW_RATE) / tutor.workerEfficiency;
  tutor.workerUsage++;
  student.add([
    pos(),
    activity({
      actor: tutor,
      target: student,
      type: "teach",
      effect: (actor, target) => {
        actor.workerUsage--;
        if (actor.workerUsage === 0) {
          actor.enterState("idle");
        }
        target.enterState("leaving", tutor, student);
      },
    }),
    progress(duration, {
      width: student.width,
    }),
  ]);
}

import config from "../../../config";
import activity from "../../../components/activity";
import progress from "../../../components/progress";
import scheduleNext from "../utils/scheduleNext";
import userContext from "../contexts/userContext";
import encode from "../utils/encode";
export default function teaching(tutor, student) {
  const duration = 5 * config.TIME_FLOW_RATE;
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
        scheduleNext();
        releaseCheck(actor, target);
      },
    }),
    progress(duration, {
      width: student.width,
    }),
  ]);
}
function releaseCheck(tutor, student) {
  const user = userContext.provide();
  student.customerPerformance += 20 * tutor.workerEfficiency;
  student.addAttendance();
  if (student.customerAttendance >= 5) {
    user.enrolled--;
  } else {
    user.roster.push(encode(student));
  }
}

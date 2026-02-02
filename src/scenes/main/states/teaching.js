import config from "../../../config";
import activity from "../../../components/activity";
import progress from "../../../components/progress";
import scheduleNext from "../utils/scheduleNext";
import enroll from "../utils/enroll";
import userContext from "../contexts/userContext";
export default function teaching(tutor, student) {
  const duration = 50 * config.TIME_FLOW_RATE;
  tutor.workerUsage++;
  student.add([
    pos(),
    progress(duration, {
      width: student.width,
    }),
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
  ]);
}
function releaseCheck(tutor, student) {
  student.customerPerformance += 20 * tutor.workerEfficiency;
  student.addAttendance();
  if (student.customerAttendance >= 5) {
    updateReputation(student);
    enroll();
  } else {
    enroll(student, student.customerIsReturning);
  }
}

function updateReputation(student) {
  const user = userContext.provide();
  user.reputation = Math.ceil(
    (user.reputation * (user.enrolled - 1) + student.customerPerformance) /
      user.enrolled,
  );
}
//TODO: separate teaching from learning

import customer from "../../../../components/customer";
import states from "../../states/states";
import status from "../../../../components/status";
import config from "../../../../config";
export default function createCustomer(level, opt = {}) {
  opt.tilePos = opt.tilePos ?? level.get("exit")[0].tilePos;
  opt.customer = opt.customer ?? {};
  opt.customer.type = opt.customer.type ?? "student";
  opt.sprite = opt.sprite ?? "onion";
  opt.states = opt.states ?? [
    "idle",
    "matching",
    "learning",
    "leaving",
    "reserved",
    "dismissed",
    "resumed",
  ];
  opt.spriteCompOpt = opt.spriteCompOpt ?? {};
  opt.spriteCompOpt.height = opt.spriteCompOpt.height ?? level.tileHeight();
  const output = level.spawn(
    [
      sprite(opt.sprite, opt.spriteCompOpt),
      pos(opt?.pos),
      state(opt.states[0], opt.states),
      status(),
      agent({ speed: (2 * level.tileWidth()) / config.TIME_FLOW_RATE }),
      customer(opt.customer),
      area(),
      opt.customer.type,
    ],
    opt.tilePos,
  );
  output.onStateEnter("matching", states.matching);
  output.onStateEnter("leaving", states.leaving);
  output.onStateEnter("dismissed", states.customer.dismissed);
  output.onStateEnter("learning", learning);
  return output;
}
//TODO: move the following to an independent file.
//Issue: customer becomes status learning but the progress doesn't start, and the state is still reserved.
import userContext from "../../contexts/userContext";
import encode from "../../utils/encode";
import progress from "../../../../components/progress";
import activity from "../../../../components/activity";
import scheduleNext from "../../utils/scheduleNext";
import enroll from "../../utils/enroll";
function learning(tutor, student) {
  if (!student || !student.exists()) return;
  const user = userContext.provide();
  user.attending.push(encode(student));
  const duration = 50 * config.TIME_FLOW_RATE;
  student.add([
    pos(),
    progress(duration, {
      width: student.width,
    }),
    activity({
      actor: tutor,
      target: student,
      type: "learning",
      effect: (actor, target) => {
        actor.workerUsage.delete(target);
        if (actor.workerUsage.size === 0) {
          actor.get("teaching")[0].finishProgress();
        }
        target.enterState("leaving", tutor, student);
        scheduleNext();
        releaseCheck(target);
      },
    }),
    "learning",
  ]);

  function releaseCheck(student) {
    const user = userContext.provide();
    user.attending.shift();
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
}

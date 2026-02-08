import activity from "../../../components/activity";
import progress from "../../../components/progress";
import config from "../../../config";
export default function teaching(tutor) {
  const duration = Infinity;
  tutor.add([
    pos(),
    progress(duration),
    activity({
      actor: tutor,
      type: "teaching",
      ongoing: (actor) => {
        actor.workerUsage.forEach((student) => {
          student.customerPerformance +=
            ((actor.workerEfficiency * 20) / (50 * config.TIME_FLOW_RATE)) *
            dt();
        });
      },
    }),
    "teaching",
  ]);
}

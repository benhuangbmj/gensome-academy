import config from "../../../config";
import scheduleNext from "./scheduleNext";
export default function trackGameTime(user) {
  loop(1, () => {
    user.gameTime++;
    if (user.gameTime % Math.ceil(60 * 16 * config.TIME_FLOW_RATE) === 0) {
      user.roster.push(...user.attended);
      user.attended = [];
      scheduleNext();
    }
  });
}

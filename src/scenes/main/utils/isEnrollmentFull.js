import userContext from "../contexts/userContext";
import config from "../../../config";
export default function isEnrollmentFull() {
  const user = userContext.provide();
  if (
    user.enrolled >=
    config.ROSTER_BASELINE + Math.floor(user.reputation / 100)
  )
    return false;
  user.enrolled++;
  return true;
}

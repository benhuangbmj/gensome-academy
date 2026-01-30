import userContext from "../contexts/userContext";
import config from "../../../config";
export default function enroll(student) {
  const user = userContext.provide();
  if (
    user.roster.length <
    config.ROSTER_BASELINE + Math.floor(user.reputation / 100)
  ) {
    user.roster.push(encode(student));
    console.log(user.roster);
  } else {
    debug.log(user.roster.length);
  }
}

function encode(student) {
  const output = JSON.stringify(
    Object.assign({ sprite: student.sprite }, student.getCustomerStats()),
  );
  return output;
}

import userContext from "../contexts/userContext";
import isEnrollmentFull from "./isEnrollmentFull";
export default function enroll(student) {
  const user = userContext.provide();
  if (isEnrollmentFull()) return;
  user.roster.push(encode(student));
  user.enrolled++;
}

function encode(student) {
  const output = JSON.stringify(
    Object.assign({ sprite: student.sprite }, student.getCustomerStats()),
  );
  return output;
}

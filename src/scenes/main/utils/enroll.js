import userContext from "../contexts/userContext";
import encode from "./encode";
export default function enroll(student, isReturning = false) {
  if (!student) {
    user.enrolled--;
    return;
  }
  const user = userContext.provide();
  student.customerIsReturning = true;
  if (!isReturning) {
    user.enrolled++;
    user.roster.push(encode(student));
  } else {
    user.attended.push(encode(student));
  }
}

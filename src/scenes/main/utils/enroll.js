import userContext from "../contexts/userContext";
import encode from "./encode";
export default function enroll(student, isReturning = null) {
  const user = userContext.provide();
  if (!student) {
    user.enrolled--;
    return;
  }
  student.customerIsReturning = true;
  if (!isReturning) {
    user.enrolled++;
    if (isReturning === null) {
      user.roster.push(encode(student));
      return;
    }
  }
  user.attended.push(encode(student));
}

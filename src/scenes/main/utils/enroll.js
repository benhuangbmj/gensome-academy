import userContext from "../contexts/userContext";
import encode from "./encode";
export default function enroll(student, isReenrolled = false) {
  if (!student) {
    user.enrolled--;
    return;
  }
  const user = userContext.provide();
  console.log("roster", user.roster);
  user.roster.push(encode(student));
  if (!isReenrolled) {
    user.enrolled++;
  }
}

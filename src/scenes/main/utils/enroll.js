import userContext from "../contexts/userContext";
import encode from "./encode";
export default function enroll(student) {
  const user = userContext.provide();
  user.roster.push(encode(student));
}

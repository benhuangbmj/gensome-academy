import findSecretary from "../utils/findSecretary";
import moveToSec from "../utils/moveToSec";
export default function leaving(tutor, student) {
  findSecretary("check-out", [tutor, student], moveToSec(student));
}

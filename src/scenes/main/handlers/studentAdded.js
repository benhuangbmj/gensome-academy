import findSecretary from "../utils/findSecretary";
import moveToSec from "../utils/moveToSec";
export default function studentAdded(obj) {
  findSecretary("check-in", [obj], moveToSec(obj), { isNew: true });
}

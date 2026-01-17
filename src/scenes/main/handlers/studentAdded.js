import findSecretary from "../utils/findSecretary";
export default function studentAdded(obj) {
  findSecretary("check-in", [obj]);
}

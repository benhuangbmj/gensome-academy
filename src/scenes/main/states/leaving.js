import findSecretary from "../utils/findSecretary";
export default function leaving(tutor, student) {
  findSecretary("check-out", [tutor, student]);
}

import levelContext from "../contexts/levelContext";
import userContext from "../contexts/userContext";
import config from "../../../config";
export default function matching(student) {
  const level = levelContext.provide();
  const user = userContext.provide();
  const availableTutors = level.get("tutor").filter((tutor) => {
    return tutor.workerUsage < tutor.workerCapacity;
  });
  if (availableTutors.length > 0) {
    const tutor = availableTutors[0];
    tutor.enterState("teaching", tutor, student);
    student.enterState("learning", tutor, student);
  } else {
    if (
      user.roster.length <
      config.ROSTER_BASELINE + Math.floor(user.reputation / 100)
    ) {
      user.roster.push(student);
    }
    student.enterState("leaving", null, student);
  }
}

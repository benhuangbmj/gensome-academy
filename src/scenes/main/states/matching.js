import levelContext from "../contexts/levelContext";
import enrollStudent from "../utils/enroll";
import isEnrollmentFull from "../utils/isEnrollmentFull";
export default function matching(student) {
  if (!isEnrollmentFull()) {
    const level = levelContext.provide();
    const availableTutors = level.get("tutor").filter((tutor) => {
      return (
        tutor.state == "idle" ||
        (tutor.state == "teaching" && tutor.workerUsage < tutor.workerCapacity)
      );
    });
    if (availableTutors.length > 0) {
      const tutor = availableTutors[0];
      tutor.enterState("teaching", tutor, student);
      student.enterState("learning", tutor, student);
      return;
    } else {
      enrollStudent(student);
    }
  }
  student.enterState("leaving", null, student);
}

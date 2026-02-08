import levelContext from "../contexts/levelContext";
import enroll from "../utils/enroll";
import isEnrollmentFull from "../utils/isEnrollmentFull";
export default function matching(student) {
  if (!isEnrollmentFull() || student.customerIsReturning) {
    const level = levelContext.provide();
    const availableTutors = level.get("tutor").filter((tutor) => {
      return (
        tutor.state == "idle" ||
        (tutor.state == "teaching" &&
          tutor.workerUsage.size < tutor.workerCapacity)
      );
    });
    if (availableTutors.length > 0) {
      const tutor = availableTutors[randi(availableTutors.length)];
      tutor.addToUsage(student);
      if (tutor.activeStatus !== "teaching")
        tutor.enterStatus("teaching", tutor);
      student.enterStatus("learning", tutor, student);
      return;
    } else {
      console.log("no tutors available, enrolling student");
      enroll(student);
    }
  } else {
    console.log("enrollment full, student leaving");
  }
  student.enterStatus("leaving", null, student);
}

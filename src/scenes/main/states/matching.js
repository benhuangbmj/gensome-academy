export default function matching(student) {
  const matchingLoop = loop(1, () => {
    const availableTutors = get("tutor").filter((tutor) => {
      return tutor.workerUsage < tutor.workerCapacity;
    });
    if (availableTutors.length > 0) {
      matchingLoop.cancel();
      const tutor = availableTutors[0];
      tutor.enterState("teaching", tutor, student);
      student.enterState("learning", tutor, student);
    }
  });
}

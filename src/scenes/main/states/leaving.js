import findSecretary from "../utils/findSecretary";
export default function leaving(tutor, student) {
  const moveToSec = (next, secretary) => {
    const targetReachedEvent = student.onTargetReached(() => {
      targetReachedEvent.cancel();
      next();
    });
    student.setTarget(secretary.pos);
  };
  findSecretary("check-out", [tutor, student], moveToSec);
}

import findSecretary from "../utils/findSecretary";
export default function studentAdded(obj) {
  const moveToSec = (next, secretary) => {
    const targetReachedEvent = obj.onTargetReached(() => {
      targetReachedEvent.cancel();
      next();
    });
    obj.setTarget(secretary.pos);
  };
  findSecretary("check-in", [obj], moveToSec);
}

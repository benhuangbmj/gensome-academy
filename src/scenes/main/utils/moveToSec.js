const moveToSec = (obj) => (next, secretary) => {
  const targetReachedEvent = obj.onTargetReached(() => {
    targetReachedEvent.cancel();
    next();
  });
  obj.setTarget(secretary.pos);
};

export default moveToSec;

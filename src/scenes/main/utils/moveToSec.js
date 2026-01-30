const moveToSec = (obj) => (next, secretary) => {
  secretary.enterState("reserved");
  obj.enterState("reserved");
  const targetReachedEvent = obj.onTargetReached(() => {
    targetReachedEvent.cancel();
    next();
  });
  obj.setTarget(secretary.pos);
};

export default moveToSec;

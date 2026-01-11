export default function activity({ duration, effect, actor, target, type }) {
  return {
    get activityDuration() {
      return duration;
    },
    get activityEffect() {
      return effect;
    },
    get activityActor() {
      return actor;
    },
    get activityTarget() {
      return target;
    },
    get activityType() {
      return type;
    },
    set activityDuration(value) {
      duration = value;
    },
    set activityEffect(value) {
      effect = value;
    },
    set activityActor(value) {
      actor = value;
    },
    set activityTarget(value) {
      target = value;
    },
    set activityType(value) {
      type = value;
    },
  };
}

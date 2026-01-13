export default function activity({ effect, actor, target, type }) {
  return {
    id: "activity",
    require: ["progress"],
    destroy() {
      effect(actor, target);
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

export default function activity({
  effect = () => {},
  actor,
  target,
  type,
  ongoing = () => {},
}) {
  return {
    id: "activity",
    require: ["progress"],
    update() {
      if (this.progressPaused) return;
      ongoing(actor, target);
    },
    destroy() {
      actor.resumeStatus();
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

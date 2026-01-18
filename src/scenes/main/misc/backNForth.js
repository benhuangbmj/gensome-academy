const APLITUDE = 20;
export default function backNForth(obj, direction, center) {
  center = center ?? vec2(...Object.values(obj.pos));
  if (direction == "right") {
    const motion = obj.onUpdate(() => {
      obj.moveTo(center.add(vec2(APLITUDE, 0)), 50);
      if (
        JSON.stringify(obj.pos) ===
        JSON.stringify(center.add(vec2(APLITUDE, 0)))
      ) {
        motion.cancel();
        obj.play("down");
        wait(3, () => {
          backNForth(obj, "left", center);
        });
      }
    });
    obj.play("right");
  } else if (direction == "left") {
    const motion = obj.onUpdate(() => {
      obj.moveTo(center.add(vec2(-APLITUDE, 0)), 50);
      if (
        JSON.stringify(obj.pos) ===
        JSON.stringify(center.add(vec2(-APLITUDE, 0)))
      ) {
        motion.cancel();
        obj.play("down");
        wait(3, () => {
          backNForth(obj, "right", center);
        });
      }
    });
    obj.play("left");
  }
}

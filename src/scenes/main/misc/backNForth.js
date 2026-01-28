export default function backNForth(obj, direction, center) {
  const APLITUDE = obj.width;
  const SPEED = 2 * obj.width;
  center = center ?? vec2(...Object.values(obj.pos));
  if (direction == "right") {
    const motion = obj.onUpdate(() => {
      obj.moveTo(center.add(vec2(APLITUDE, 0)), SPEED);
      if (
        JSON.stringify(obj.pos) ===
        JSON.stringify(center.add(vec2(APLITUDE, 0)))
      ) {
        motion.cancel();
        playAnim(obj, "down");
        wait(3, () => {
          backNForth(obj, "left", center);
        });
      }
    });
    playAnim(obj, "right");
  } else if (direction == "left") {
    const motion = obj.onUpdate(() => {
      obj.moveTo(center.add(vec2(-APLITUDE, 0)), SPEED);
      if (
        JSON.stringify(obj.pos) ===
        JSON.stringify(center.add(vec2(-APLITUDE, 0)))
      ) {
        motion.cancel();
        playAnim(obj, "down");
        wait(3, () => {
          backNForth(obj, "right", center);
        });
      }
    });
    playAnim(obj, "left");
  }
}
function playAnim(obj, anim) {
  if (obj.hasAnim(anim)) {
    obj.play(anim);
  }
}

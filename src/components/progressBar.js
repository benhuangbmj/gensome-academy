export default function progressBar(
  duration = 5,
  {
    width = 120,
    height = 12,
    fillColor = rgb(0, 255, 100),
    backgroundColor = rgb(160, 160, 160),
    borderColor = rgb(0, 0, 0),
    offset = vec2(0, 0),
    loop = false,
    onComplete,
  } = {}
) {
  let elapsed = 0;
  let finished = false;
  const OUTLINE = 2;

  return {
    id: "progressBar",
    require: ["pos"],
    update() {
      if (finished || duration <= 0) {
        if (loop) {
          this.resetProgress();
        } else return;
      }
      elapsed = Math.min(elapsed + dt(), duration);
      if (elapsed >= duration) {
        finished = true;
        onComplete?.(this);
      }
    },
    draw() {
      drawRect({
        pos: offset,
        width,
        height,
        color: backgroundColor,
        anchor: "left",
        outline: { width: OUTLINE, color: borderColor },
        radius: height,
      });
      const fillRatio = duration > 0 ? elapsed / duration : 1;
      const innerWidth = Math.max(0, width - OUTLINE) * fillRatio;
      const innerHeight = Math.min(
        height - OUTLINE,
        2 *
          Math.sqrt(
            ((height - OUTLINE) / 2) ** 2 -
              ((height - OUTLINE) / 2 -
                Math.min(innerWidth, (height - OUTLINE) / 2)) **
                2
          )
      );
      if (innerWidth > 0) {
        if (innerWidth <= innerHeight) {
          drawCircle({
            pos: offset.add(vec2(OUTLINE / 2, 0)),
            radius: innerWidth / 2,
            color: fillColor,
            anchor: "left",
          });
        } else {
          drawRect({
            pos: offset.add(vec2(OUTLINE / 2, 0)),
            width: innerWidth,
            height: height - OUTLINE,
            color: fillColor,
            anchor: "left",
            radius: height - OUTLINE,
          });
        }
      }
    },
    resetProgress() {
      elapsed = 0;
      finished = false;
    },
    get progress() {
      return duration > 0 ? elapsed / duration : 1;
    },
  };
}

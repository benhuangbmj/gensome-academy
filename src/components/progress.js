export default function progress(
  duration = 5,
  {
    width = 120,
    height = 6,
    fillColor = rgb(0, 255, 100),
    backgroundColor = rgb(160, 160, 160),
    borderColor = rgb(0, 0, 0),
    outline = 2,
    offset = vec2(0, 0),
    loop = false,
    onProgressFinished,
    onProgressDestroyed,
  } = {},
) {
  let elapsed = 0;
  let finished = false;
  let _onProgressFinished = onProgressFinished;
  let _loop = loop;
  let _onProgressDestroyed = onProgressDestroyed;
  let paused = false;

  return {
    id: "progress",
    require: ["pos"],
    destroy() {
      _onProgressDestroyed?.(this);
    },
    update() {
      if (paused || duration === Infinity) return;
      if (finished || duration <= 0) {
        if (_loop) {
          this.resetProgress();
        } else {
          this.destroy();
        }
      }
      elapsed = Math.min(elapsed + dt(), duration);
      if (elapsed >= duration) {
        finished = true;
        _onProgressFinished?.(this);
      }
    },
    draw() {
      if (duration === Infinity) return;
      drawRect({
        pos: offset,
        width,
        height,
        color: backgroundColor,
        anchor: "left",
        outline: { width: outline, color: borderColor },
        radius: height,
      });
      const fillRatio = duration > 0 ? elapsed / duration : 1;
      const innerWidth = Math.max(0, width - outline) * fillRatio;
      const innerHeight = height - outline;
      if (innerWidth > 0) {
        if (innerWidth <= innerHeight) {
          drawCircle({
            pos: offset.add(vec2(outline / 2, 0)),
            radius: innerWidth / 2,
            color: fillColor,
            anchor: "left",
          });
        } else {
          drawRect({
            pos: offset.add(vec2(outline / 2, 0)),
            width: innerWidth,
            height: height - outline,
            color: fillColor,
            anchor: "left",
            radius: height - outline,
          });
        }
      }
    },
    resetProgress() {
      elapsed = 0;
      finished = false;
    },
    finishProgress() {
      finished = true;
    },
    get onProgressFinished() {
      return _onProgressFinished;
    },
    set onProgressFinished(fn) {
      _onProgressFinished = fn;
    },
    get progress() {
      return duration > 0 ? elapsed / duration : 1;
    },
    set isProgressLooping(val) {
      _loop = val;
    },
    get isProgressLooping() {
      return _loop;
    },
    get progressPaused() {
      return paused;
    },
    set progressPaused(val) {
      paused = val;
    },
  };
}

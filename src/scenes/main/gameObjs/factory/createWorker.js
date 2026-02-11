import worker from "../../../../components/worker";
import states from "../../states/states";
import status from "../../../../components/status";
export default function createWorker(level, opt) {
  opt.tilePos = opt.tilePos ?? vec2(1, 1);
  const output = level.spawn(
    [
      sprite(opt.sprite, { width: opt?.width }),
      pos(opt.pos),
      state(opt.states[0], opt.states),
      worker(opt),
      status(),
      area(),
      ...opt.type,
    ],
    opt.tilePos,
  );
  output.onStateEnter("check-in", states.checkIn);
  output.onStateEnter("teaching", states.teaching);
  output.onStateEnter("check-out", states.checkOut);
  return output;
}

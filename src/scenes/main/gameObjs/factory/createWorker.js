import worker from "../../../../components/worker";
import states from "../../states/states";
export default function createWorker(opt) {
  const output = add([
    sprite(opt.sprite, { width: opt?.width }),
    pos(opt.pos),
    state(opt.states[0], opt.states),
    worker(opt),
    ...opt.type,
  ]);
  output.onStateEnter("check-in", states.checkIn);
  output.onStateEnter("teaching", states.teaching);
  output.onStateEnter("check-out", states.checkOut);
  return output;
}

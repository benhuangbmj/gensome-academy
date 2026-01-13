import worker from "../../../../components/worker";
export default function createWorker(opt) {
  opt = opt ?? {
    salary: 0,
    efficiency: 1,
    rate: 30,
    type: ["tutor"],
    states: ["idle", "check-in", "teach", "check-out"],
    sprite: "julia",
    pos: vec2(100, 100),
    width: 160,
  };
  const output = add([
    sprite(opt.sprite, { width: opt?.width }),
    pos(opt.pos),
    state(opt.states[0], opt.states),
    worker(opt),
    ...opt.type,
  ]);
  return output;
}

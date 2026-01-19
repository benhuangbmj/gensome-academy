import customer from "../../../../components/customer";
import states from "../../states/states";
export default function createCustomer(level, opt) {
  opt.tilePos = opt.tilePos ?? vec2(1, 1);
  const output = level.spawn(
    [
      sprite(opt.sprite, { width: opt?.width }),
      pos(opt?.pos),
      state(opt.states[0], opt.states),
      customer(opt),
      opt.type,
    ],
    opt.tilePos,
  );
  output.onStateEnter("matching", states.matching);
  output.onStateEnter("leaving", states.leaving);
  return output;
}

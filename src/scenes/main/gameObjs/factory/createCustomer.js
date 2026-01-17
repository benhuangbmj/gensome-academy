import customer from "../../../../components/customer";
import states from "../../states/states";
export default function createCustomer(opt) {
  const output = add([
    sprite(opt.sprite, { width: opt?.width }),
    pos(opt?.pos),
    state(opt.states[0], opt.states),
    customer(opt),
    opt.type,
  ]);
  output.onStateEnter("matching", states.matching);
  output.onStateEnter("leaving", states.leaving);
  return output;
}

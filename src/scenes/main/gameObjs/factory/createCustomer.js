import customer from "../../../../components/customer";
import states from "../../states/states";
export default function createCustomer(level, opt) {
  opt.tilePos = opt.tilePos ?? vec2(1, 1);
  opt.customer = opt.customer ?? {};
  opt.customer.type = opt.customer.type ?? "student";
  opt.sprite = opt.sprite ?? "onion";
  opt.states = opt.states ?? [
    "idle",
    "matching",
    "learning",
    "leaving",
    "reserved",
    "dismissed",
  ];
  opt.spriteCompOpt = opt.spriteCompOpt ?? {};
  opt.spriteCompOpt.height = opt.spriteCompOpt.height ?? level.tileHeight();
  const output = level.spawn(
    [
      sprite(opt.sprite, opt.spriteCompOpt),
      pos(opt?.pos),
      state(opt.states[0], opt.states),
      agent({ speed: 2 * level.tileWidth() }),
      customer(opt.customer),
      opt.customer.type,
    ],
    opt.tilePos,
  );
  output.onStateEnter("matching", states.matching);
  output.onStateEnter("leaving", states.leaving);
  output.onStateEnter("dismissed", states.customer.dismissed);
  return output;
}

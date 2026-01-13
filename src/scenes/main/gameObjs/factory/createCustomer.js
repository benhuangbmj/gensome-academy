import customer from "../../../../components/customer";
export default function createCustomer(opt) {
  const output = add([
    sprite(opt.sprite, { width: opt?.width }),
    pos(opt?.pos),
    state(opt.states[0], opt.states),
    customer(opt),
    opt.type,
  ]);
}

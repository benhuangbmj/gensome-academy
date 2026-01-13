import customer from "../../../../components/customer";
export default function createCustomer(
  { performance, satisfaction, type, customerSprite, states = ["idle"] },
  opt
) {
  const output = add([
    sprite(customerSprite, { width: opt?.width }),
    pos(opt?.pos),
    state(states[0], states),
    customer({ performance, satisfaction, type }),
    type,
  ]);
}

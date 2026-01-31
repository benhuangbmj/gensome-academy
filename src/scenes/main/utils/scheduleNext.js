import userContext from "../contexts/userContext";
import createCustomer from "../gameObjs/factory/createCustomer";
import levelContext from "../contexts/levelContext";
export default function scheduleNext() {
  const user = userContext.provide();
  const level = levelContext.provide();
  const nextCustomer = user.roster.shift();
  if (nextCustomer) {
    console.log(nextCustomer, JSON.parse(nextCustomer));
    createCustomer(level, JSON.parse(nextCustomer));
  }
}

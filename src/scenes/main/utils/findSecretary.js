import levelContext from "../contexts/levelContext";
import findExcludedStates from "./findExcludedStates";
const highPriorityStates = ["check-in", "check-out"];
export default function findSecretary(
  customer,
  nextState,
  args = [],
  callback = (next) => {
    next();
  },
  opt,
) {
  const level = levelContext.provide();
  const findSecretaryLoop = loop(1, () => {
    const availableSecretaries = findNonadmin(level);
    const secretary = availableSecretaries[randi(availableSecretaries.length)];
    if (secretary) {
      findSecretaryLoop.paused = true;
      secretary.enterStatus("reserved");
      callback(() => {
        if (highPriorityStates.includes(secretary.activeStatus)) {
          findSecretaryLoop.paused = false;
          return;
        }
        customer.state !== "reserved" && customer.enterStatus("reserved");
        secretary.enterStatus(nextState, secretary, ...args, opt);
      }, secretary);
      preventStaleStatus(customer, findSecretaryLoop);
    }
  });
  return findSecretaryLoop;
}
function findNonadmin(level) {
  const output = findExcludedStates(
    "secretary",
    ["check-in", "check-out", "reserved"],
    level,
  );
  return output;
}
function preventStaleStatus(customer, findSecretaryLoop) {
  let timeLapse = 0;
  if (!customer) {
    findSecretaryLoop.cancel();
    return;
  }
  var reservedUpdateControl = customer.onStateUpdate("reserved", () => {
    timeLapse += dt();
    if (timeLapse > timeLapseThreshold()) {
      reservedUpdateControl?.cancel();
      reservedEndControl?.cancel();
      if (!findSecretaryLoop) return;
      findSecretaryLoop.paused = false;
      findSecretaryLoop.resumed = true;
    }
  });
  var reservedEndControl = customer.onStateEnd("reserved", () => {
    reservedEndControl?.cancel();
    reservedUpdateControl?.cancel();
    findSecretaryLoop?.cancel();
  });
  function timeLapseThreshold() {
    return 30;
  }
}

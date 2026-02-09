import levelContext from "../contexts/levelContext";
import findExcludedStates from "./findExcludedStates";
export default function findSecretary(
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
      callback(() => {
        if (
          ["check-in", "check-out"].includes(secretary.state) ||
          ["check-in", "check-out"].includes(secretary.activeStatus)
        ) {
          findSecretaryLoop.paused = false;
          return;
        }
        findSecretaryLoop.cancel();
        secretary.enterStatus(nextState, secretary, ...args, opt);
      }, secretary);
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

import levelContext from "../contexts/levelContext";
import findExcludedStates from "./findExcludedStates";
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
    if (findSecretaryLoop.resumed) {
      console.log(
        customer.id,
        "find secretary loop resumed, resetting resumed status",
      );

      findSecretaryLoop.resumed = false;
    }
    const availableSecretaries = findNonadmin(level);
    const secretary = availableSecretaries[randi(availableSecretaries.length)];
    if (secretary) {
      findSecretaryLoop.paused = true;
      secretary.enterStatus("reserved");
      callback(() => {
        if (["check-in", "check-out"].includes(secretary.activeStatus)) {
          findSecretaryLoop.paused = false;
          return;
        }
        customer.state !== "reserved" && customer.enterStatus("reserved");
        secretary.enterStatus(nextState, secretary, ...args, opt);
      }, secretary);
      let timeLapse = 0;
      if (!customer) {
        findSecretaryLoop.cancel();
        return;
      }
      var reservedUpdateControl = customer.onStateUpdate("reserved", () => {
        timeLapse += dt();
        if (timeLapse > 10) {
          console.log(
            customer.id,
            "has been waiting for ",
            timeLapse,
            " seconds",
          );
          reservedUpdateControl?.cancel();
          if (!findSecretaryLoop) return;
          console.log(customer.id, "resuming find secretary loop");
          findSecretaryLoop.paused = false;
          findSecretaryLoop.resumed = true;
          reservedEndControl?.cancel();
        }
      });
      var reservedEndControl = customer.onStateEnd("reserved", () => {
        reservedEndControl?.cancel();
        reservedUpdateControl?.cancel();
        findSecretaryLoop?.cancel();
      });
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

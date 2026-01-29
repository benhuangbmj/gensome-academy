import levelContext from "../contexts/levelContext";
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
    const availableSecretaries = level
      .get("secretary")
      .filter((secretary) => secretary.state === "idle");
    if (availableSecretaries.length > 0) {
      findSecretaryLoop.cancel();
      const secretary = availableSecretaries[0];
      callback(() => {
        secretary.enterState(nextState, secretary, ...args, opt);
      }, secretary);
    }
  });
}

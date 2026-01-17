export default function findSecretary(nextState, args = []) {
  const findSecretaryLoop = loop(1, () => {
    const availableSecretaries = get("secretary").filter(
      (secretary) => secretary.state === "idle"
    );
    if (availableSecretaries.length > 0) {
      findSecretaryLoop.cancel();
      const secretary = availableSecretaries[0];
      secretary.enterState(nextState, secretary, ...args);
    }
  });
}

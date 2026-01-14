export default function studentAdded(obj) {
  const findSecretaryLoop = loop(1, () => {
    const availableSecretary = get("secretary");
    if (availableSecretary.length > 0) {
      findSecretaryLoop.cancel();
      const secretary = availableSecretary[0];
      secretary.enterState("check-in", obj);
    }
  });
}

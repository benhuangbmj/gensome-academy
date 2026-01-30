import levelContext from "../../contexts/levelContext";

const dismissed = (obj) => {
  const level = levelContext.provide();
  obj.setTarget(level.get("exit")[0].pos);
  obj.onTargetReached(() => wait(1, () => obj.destroy()));
};
export default dismissed;

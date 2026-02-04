export default function findExcludedStates(tags, states, obj) {
  obj = obj ?? getTreeRoot();
  const output = obj.get(tags).filter((e) => !states.includes(e.state));
  return output;
}

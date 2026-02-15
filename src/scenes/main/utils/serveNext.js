//NOTE: This hasn't been deployed yet.
import runtimeContext from "../contexts/runtimeContext";
import moveToSec from "./moveToSec";
import findSecretary from "./findSecretary";
export default function serveNext() {
  const runtime = runtimeContext.provide();
  if (runtime.customerQueue.size === 0) return false;
  const [obj, [nextState, args]] = runtime.customerQueue.entries().next().value;
  runtime.customerQueue.delete(runtime.customerQueue.keys().next().value);
  findSecretary(nextState, args, moveToSec(obj, nextState));
  return true;
}

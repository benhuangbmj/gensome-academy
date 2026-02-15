//NOTE: This hasn't been deployed yet.
import serveNext from "./serveNext";
import runtimeContext from "../contexts/runtimeContext";
const runtime = runtimeContext.provide();
function add(key, nextState, args) {
  runtime.customerQueue.set(key, [nextState, args]);
  serveNext();
}
function remove(key) {
  runtime.customerQueue.delete(key);
}

export default {
  add,
  delete: remove,
};

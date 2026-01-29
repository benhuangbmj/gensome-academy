import generateUser from "../utils/generateUser";

let context = {};
let k;
function create() {
  context = Object.assign(context, generateUser(k));
}
function provide() {
  return context;
}
function useKaplay(val) {
  k = val;
}
export default {
  create,
  provide,
  useKaplay,
};

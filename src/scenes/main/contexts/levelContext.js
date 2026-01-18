let level;
function create(context) {
  level = context;
}
function provide() {
  return level;
}
export default {
  create,
  provide,
};

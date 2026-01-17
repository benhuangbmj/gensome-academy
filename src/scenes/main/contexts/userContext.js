let user;
function create(context) {
  user = context;
}
function provide() {
  return user;
}
export default {
  create,
  provide,
};

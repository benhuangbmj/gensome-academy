//NOTE: This hasn't been deployed yet.
//const customerQueue = new Map();
const runtime = { mouseMovedEvent: null, mousePressedEvent: null };

function provide() {
  return runtime;
}

export default {
  provide,
};

//NOTE: This hasn't been deployed yet.
const customerQueue = new Map();

function provide() {
  return {
    customerQueue,
  };
}

export default {
  provide,
};

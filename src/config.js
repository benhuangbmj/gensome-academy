let timeFlowRate = 1; //the number of secs in an in-game minute
export default {
  get TIME_FLOW_RATE() {
    return timeFlowRate;
  }, //the number of secs in an in-game minute
  ROSTER_BASELINE: 6,
  REPUTATION_CONVERSION_RATE: 100,
  adjustTimeFlow(scale) {
    timeFlowRate *= scale;
  },
};

export default function customer({ performance, satisfaction, type }) {
  return {
    id: "customer",
    get customerPerformance() {
      return performance;
    },
    get customerSatisfaction() {
      return satisfaction;
    },
    get customerType() {
      return type;
    },
    set customerPerformance(value) {
      performance = value;
    },
    set customerSatisfaction(value) {
      satisfaction = value;
    },
    set customerType(value) {
      type = value;
    },
  };
}

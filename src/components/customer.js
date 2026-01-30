export default function customer({
  performance = 0,
  satisfaction = 50,
  attendance = 0,
  type = "student",
}) {
  return {
    id: "customer",
    get customerAttendance() {
      return attendance;
    },
    get customerPerformance() {
      return performance;
    },
    get customerSatisfaction() {
      return satisfaction;
    },
    get customerType() {
      return type;
    },
    set customerAttendance(value) {
      attendance = value;
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
    addAttendance() {
      attendance++;
    },
    getCustomerStats() {
      return {
        performance,
        satisfaction,
        attendance,
        type,
      };
    },
  };
}

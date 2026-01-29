export default function customer({
  performance = 0,
  satisfaction = 50,
  attendance = 0,
  type = "student",
}) {
  let _attendance = attendance;
  return {
    id: "customer",
    get customerAttendance() {
      return _attendance;
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
      _attendance = value;
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
      _attendance++;
    },
  };
}

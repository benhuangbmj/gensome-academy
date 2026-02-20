import personnel from "./utils/personnel";
export default function customer({
  performance = 0,
  satisfaction = 50,
  attendance = 0,
  isReturning = false,
  type = "student",
}) {
  const _personnel = personnel();
  return Object.assign({
    id: "customer",
    get customerAttendance() {
      return attendance;
    },
    get customerIsReturning() {
      return isReturning;
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
    set customerIsReturning(value) {
      isReturning = value;
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
    getStats() {
      return {
        personnelEfficiency: _personnel.personnelEfficiency,
        performance,
        satisfaction,
        attendance,
        isReturning,
        type,
      };
    },
  }, _personnel);
}

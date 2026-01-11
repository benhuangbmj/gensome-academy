export default function worker({ salary, efficiency, rate, type }) {
  return {
    get workerSalary() {
      return salary;
    },
    get workerEfficiency() {
      return efficiency;
    },
    get workerRate() {
      return rate;
    },
    get workerType() {
      return type;
    },
    set workerSalary(value) {
      salary = value;
    },
    set workerEfficiency(value) {
      efficiency = value;
    },
    set workerRate(value) {
      rate = value;
    },
    set workerType(value) {
      type = value;
    },
  };
}

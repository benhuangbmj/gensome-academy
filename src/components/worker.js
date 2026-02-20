import personnel from "./utils/personnel";

export default function worker({
  salary,
  efficiency,
  rate,
  type,
  capacity = 1,
  usage = new Set(),
}) {
  const _personnel = personnel(efficiency);
  return Object.assign({
    id: "worker",
    addToUsage(obj) {
      usage.add(obj);
    },
    removeFromUsage(obj) {
      usage.delete(obj);
    },
    get workerSalary() {
      return salary;
    },
    get workerEfficiency() {
      return _personnel.personnelEfficiency;
    },
    get workerRate() {
      return rate;
    },
    get workerType() {
      return type;
    },
    get workerCapacity() {
      return capacity;
    },
    get workerUsage() {
      return usage;
    },
    set workerSalary(value) {
      salary = value;
    },
    set workerEfficiency(value) {
      _personnel.personnelEfficiency = value;
    },
    set workerRate(value) {
      rate = value;
    },
    set workerType(value) {
      type = value;
    },
    set workerCapacity(value) {
      capacity = value;
    },
    set workerUsage(value) {
      usage = value;
    },
  }, _personnel);
}

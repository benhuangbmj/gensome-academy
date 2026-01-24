export default function available(value) {
  let isAvailable = value ?? true;
  return {
    id: "available",
    get isAvailable() {
      return isAvailable;
    },
    set isAvailable(value) {
      isAvailable = value;
    },
  };
}

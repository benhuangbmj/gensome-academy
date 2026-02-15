const transitionStatus = ["idle", "reserved", "resumed"];
export default function status() {
  let active = "idle";
  let stack = [];
  return {
    id: "status",
    require: ["state"],
    get activeStatus() {
      return active;
    },
    get statusStack() {
      return stack;
    },
    enterStatus(state, ...args) {
      if (!transitionStatus.includes(state)) {
        if (!transitionStatus.includes(active)) {
          stack.push(active);
          const currProgress = this.get(active)[0];
          if (currProgress) currProgress.progressPaused = true;
        }
        active = state;
        const nextProgress = this.get(state)?.[0];
        if (nextProgress) {
          nextProgress.progressPaused = false;
          return;
        }
      } else {
        active = state;
      }
      this.enterState(state, ...args);
    },
    resumeStatus() {
      active = "resumed";
      const lastStatus = stack.pop() ?? "idle";
      this.enterStatus(lastStatus);
    },
  };
}

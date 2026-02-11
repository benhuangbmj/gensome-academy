export default function status() {
  let active = null;
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
      if (!["idle", "reserved"].includes(state)) {
        if (active !== null) {
          if (["check-in", "check out"].includes(active)) {
            console.log("interrupt ", active, " with ", state);
          }
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
        active = null;
      }
      this.enterState(state, ...args);
    },
    resumeStatus() {
      active = null;
      const lastStatus = stack.pop() ?? "idle";
      this.enterStatus(lastStatus);
    },
  };
}

export default function status() {
  let active = null;
  let stack = [];
  return {
    id: "status",
    require: ["state"],
    get activeStatus() {
      return active;
    },
    enterStatus(state, ...args) {
      if (state !== "idle") {
        if (active !== null) {
          stack.push(active);
          const currProgress = this.get(active)[0];
          currProgress.progressPaused = true;
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

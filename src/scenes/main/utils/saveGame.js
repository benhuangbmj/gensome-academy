export default function saveGame({ user }) {
  function saveNow() {
    setData("user-data", JSON.stringify(user));
  }
  loop(5, () => {
    saveNow();
  });
  onKeyPress("f4", (key) => {
    debug.log("Game being saved...");
    saveNow();
  });
}

export default function saveGame({ user }) {
  loop(1, () => {
    setData("user-data", JSON.stringify(user));
  });
}

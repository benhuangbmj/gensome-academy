export default function trackGameTime(user) {
  loop(1, () => {
    user.gameTime++;
  });
}

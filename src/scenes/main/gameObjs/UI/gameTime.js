export default function gameTime(user) {
  let GAP = 10;
  let WIDTH = 300;
  let HEIGHT = 60;
  let TEXT_SIZE = 24;
  const container = add([
    pos(GAP, GAP),
    rect(WIDTH, HEIGHT),
    outline(4),
    fixed(),
  ]);
  const gameTimeText = container.add([
    pos(GAP, (container.height - TEXT_SIZE) / 2),
    color(BLACK),
    text(`Game Time: ${user.gameTime}`, { size: TEXT_SIZE }),
  ]);
  gameTimeText.onUpdate(() => {
    gameTimeText.text = `Game Time: ${user.gameTime}`;
  });
}

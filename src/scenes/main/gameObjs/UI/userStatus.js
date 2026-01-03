export default function generateUserStatus(user) {
  const userStatus = add([
    pos(width() - 410, 10),
    rect(400, 70),
    outline(4),
    fixed(),
  ]);
  userStatus.add([
    sprite("coin", { anim: "shine", height: userStatus.height / 1.5 }),
    pos(10, (userStatus.height - userStatus.height / 1.5) / 2),
    area(),
    "coin",
  ]);

  const cash = userStatus.add([
    text(`${user.cash}`, { size: 36 }),
    pos(65, (userStatus.height - 36) / 2),
    color(BLACK),
  ]);
  onClick("coin", () => {
    debug.log("Adding cash...");
    user.cash++;
    cash.text = `${user.cash}`;
  });
  return { userStatus, cash };
}

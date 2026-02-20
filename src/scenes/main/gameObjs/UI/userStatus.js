
export default function generateUserStatus(user) {
  const GAP = 10;
  const WIDTH = Math.min(300, width() / 3 - 2 * GAP);
  const TEXT_SIZE = 24;
  const ICON_HEIGHT = 36;
  const statusData = [
  {sprite: {name: "coin", opt: {anim: "shine"}},text: () =>user.cash},
  {sprite: {name: "controller", opt: {}}, text: () =>user.FP},
  {sprite: {name: "config", opt: {}}, text: () =>user.MP},
  {sprite: {name: "star", opt: {}}, text: () =>user.reputation},
  {sprite: {name: "onion", opt:{}}, text: () =>null}
]
  const HEIGHT = (statusData.length + 1) * GAP + statusData.length * ICON_HEIGHT;
  const userStatus = add([
    pos(width() - WIDTH - GAP, GAP),
    rect(WIDTH, HEIGHT),
    outline(4),
    fixed(),
  ]);
  const coinIcon = userStatus.add([
    sprite("coin", { anim: "shine", height: ICON_HEIGHT }),
    pos(GAP, GAP),
    area(),
  ]);
  const cashText = userStatus.add([
    text(`${user.cash}`, { size: TEXT_SIZE }),
    pos(userStatus.width - GAP, GAP + (ICON_HEIGHT - TEXT_SIZE) / 2),
    color(BLACK),
    anchor("topright"),
    {add() {
      this.hidden = true;
    }}
  ]);
  cashText.onDraw(() => {
    cashText.text = `${user.cash}`;
  });

  const facilityIcon = userStatus.add([
    sprite("copy-machine", { height: ICON_HEIGHT + 8 }),
    pos(GAP - 4, 2 * GAP + ICON_HEIGHT - 10),
    area(),
    {add() {
      this.hidden = true;
    }}
  ]);
  const FPText = userStatus.add([
    text(`${user.FP}`, { size: TEXT_SIZE }),
    pos(
      userStatus.width - GAP,
      2 * GAP + ICON_HEIGHT + (ICON_HEIGHT - TEXT_SIZE) / 2,
    ),
    color(BLACK),
    anchor("topright"),
    {add() {
      this.hidden = true;
    }}
  ]);
  FPText.onDraw(() => {
    FPText.text = `${user.FP}`;
  });

  const gearIcon = userStatus.add([
    sprite("gear", { height: ICON_HEIGHT }),
    pos(GAP, 3 * GAP + 2 * ICON_HEIGHT),
    area(),
    {add() {
      this.hidden = true;
    }}
  ]);
  const MPText = userStatus.add([
    text(`${user.MP}`, { size: TEXT_SIZE }),
    pos(
      userStatus.width - GAP,
      3 * GAP + 2 * ICON_HEIGHT + (ICON_HEIGHT - TEXT_SIZE) / 2,
    ),
    color(BLACK),
    anchor("topright"),
    {add() {
      this.hidden = true;
    }}
  ]);
  MPText.onDraw(() => {
    MPText.text = `${user.MP}`;
  });

  const trophyIcon = userStatus.add([
    sprite("trophy", { height: ICON_HEIGHT }),
    pos(GAP, 4 * GAP + 3 * ICON_HEIGHT),
    area(),
    {add() {
      this.hidden = true;
    }}
  ]);
  const reputationText = userStatus.add([
    text(`${user.reputation}`, { size: TEXT_SIZE }),
    pos(
      userStatus.width - GAP,
      4 * GAP + 3 * ICON_HEIGHT + (ICON_HEIGHT - TEXT_SIZE) / 2,
    ),
    color(BLACK),
    anchor("topright"),
    {add() {
      this.hidden = true;
    }}
  ]);
  reputationText.onDraw(() => {
    reputationText.text = `${user.reputation}`;
  });

  function mouseClickedAction(cbLeft, cbRight) {
    if (isMousePressed("left")) {
      cbLeft();
    }
    if (isMousePressed("right")) {
      cbRight();
    }
  }
  if (environment === "dev") {
    coinIcon.onClick(() => {
      mouseClickedAction(
        () => {
          debug.log("Adding cash...");
          user.cash += 1000;
        },
        () => {
          debug.log("Subtracting cash...");
          user.cash = Math.max(0, user.cash - 10000);
        },
      );
    });
    facilityIcon.onClick(() => {
      mouseClickedAction(
        () => {
          debug.log("Adding FP...");
          user.FP += 100;
        },
        () => {
          debug.log("Subtracting FP...");
          user.FP = Math.max(0, user.FP - 100);
        },
      );
    });
    gearIcon.onClick(() => {
      mouseClickedAction(
        () => {
          debug.log("Adding MP...");
          user.MP += 100;
        },
        () => {
          debug.log("Subtracting MP...");
          user.MP = Math.max(0, user.MP - 100);
        },
      );
    });
    trophyIcon.onClick(() => {
      mouseClickedAction(
        () => {
          debug.log("Adding reputation...");
          user.reputation += 10;
        },
        () => {
          debug.log("Subtracting reputation...");
          user.reputation = Math.max(0, user.reputation - 10);
        },
      );
    });
  }  
  statusData.forEach((data, i) => {
    userStatus.add([
      sprite(data.sprite.name, Object.assign(data.sprite.opt, {height: ICON_HEIGHT})),
      pos(GAP, (i + 1) * GAP + i * ICON_HEIGHT)]);
    userStatus.add([
      text(data.text() !== null ? `${data.text()}` : "", { size: TEXT_SIZE }),
      pos(
        userStatus.width - GAP,
        (i + 1) * GAP + i * ICON_HEIGHT + (ICON_HEIGHT - TEXT_SIZE) / 2,
      ),
      color(BLACK),
      anchor("topright"),
      {
        draw() {
          this.text = data.text() !== null ? `${data.text()}` : "";
        }
      }
    ]);  
    })
}

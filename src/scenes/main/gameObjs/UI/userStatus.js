export default function generateUserStatus(user) {
  let GAP = 10;
  let WIDTH = Math.min(600, width() - 2 * GAP);
  let HEIGHT = 70;
  let TEXT_SIZE = 24;
  const ICON_WIDTH = (WIDTH - 7 * GAP) / 9;
  const ICON_HEIGHT = HEIGHT - 2 * GAP;
  const userStatus = add([
    pos(width() - WIDTH - GAP, GAP),
    rect(WIDTH, HEIGHT),
    outline(4),
    fixed(),
  ]);
  const coinIcon = userStatus.add([
    sprite("coin", { anim: "shine", height: ICON_HEIGHT }),
    pos(GAP, (userStatus.height - ICON_HEIGHT) / 2),
    area(),
  ]);
  const cashText = userStatus.add([
    text(`${user.cash}`, { size: TEXT_SIZE }),
    pos(2 * GAP + ICON_WIDTH, (userStatus.height - TEXT_SIZE) / 2),
    color(BLACK),
  ]);
  cashText.onUpdate(() => {
    cashText.text = `${user.cash}`;
  });

  const facilityIcon = userStatus.add([
    sprite("copy-machine", { height: ICON_HEIGHT + 10 }),
    pos(3 * GAP + 3 * ICON_WIDTH, (userStatus.height - ICON_HEIGHT) / 2 - 12.5),
    area(),
  ]);
  const FPText = userStatus.add([
    text(`${user.FP}`, { size: TEXT_SIZE }),
    pos(4.5 * GAP + 4 * ICON_WIDTH, (userStatus.height - TEXT_SIZE) / 2),
    color(BLACK),
  ]);
  FPText.onDraw(() => {
    FPText.text = `${user.FP}`;
  });

  const gearIcon = userStatus.add([
    sprite("gear", { height: ICON_HEIGHT }),
    pos(5.5 * GAP + 6 * ICON_WIDTH, (userStatus.height - ICON_HEIGHT) / 2),
    area(),
  ]);
  const MPText = userStatus.add([
    text(`${user.MP}`, { size: TEXT_SIZE }),
    pos(6.5 * GAP + 7 * ICON_WIDTH, (userStatus.height - TEXT_SIZE) / 2),
    color(BLACK),
  ]);
  MPText.onDraw(() => {
    MPText.text = `${user.MP}`;
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
          user.cash = Math.max(0, user.cash - 1000);
        }
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
        }
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
        }
      );
    });
  }
}

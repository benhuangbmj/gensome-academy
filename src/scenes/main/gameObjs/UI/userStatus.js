
export default function generateUserStatus(user) {
  const GAP = 10;
  const WIDTH = Math.min(300, width() / 3 - 2 * GAP);
  const TEXT_SIZE = width() > 600? 32 :20;
  const ICON_HEIGHT = 36;
  const statusData = [
  {sprite: {name: "coin", opt: {anim: "shine"}},text: () =>user.cash, onClick: coinIconOnClick },
  {sprite: {name: "controller", opt: {}}, text: () =>user.FP, onClick: facilityIconOnClick},
  {sprite: {name: "config", opt: {}}, text: () =>user.MP, onClick: gearIconOnClick},
  {sprite: {name: "star", opt: {}}, text: () =>user.reputation, onClick: starIconOnClick},
  {sprite: {name: "onion", opt:{}}, text: () =>null}
]
  const HEIGHT = (statusData.length + 1) * GAP + statusData.length * ICON_HEIGHT;
  const userStatus = add([
    pos(width() - WIDTH - GAP, GAP),
    rect(WIDTH, HEIGHT),
    outline(4),
    fixed(),
  ]);
  statusData.forEach((data, i) => {
    userStatus.add([
      sprite(data.sprite.name, Object.assign(data.sprite.opt, {height: ICON_HEIGHT})),
      pos(GAP, (i + 1) * GAP + i * ICON_HEIGHT),
      area(), {
        add() {
           if (environment === "dev") {
            data.onClick && this.onClick(data.onClick);
           }
        }
      }]);
    userStatus.add([
      text(data.text() !== null ? `${convertUnit(data.text())}` : "", { size: TEXT_SIZE }),
      pos(
        userStatus.width - GAP,
        (i + 1) * GAP + i * ICON_HEIGHT + (ICON_HEIGHT - TEXT_SIZE) / 2,
      ),
      color(BLACK),
      anchor("topright"),
      {
        draw() {
          this.text = data.text() !== null ? `${convertUnit(data.text())}` : "";
        }
      }
    ]);  
    })

  function mouseClickedAction(cbLeft, cbRight) {
    if (isMousePressed("left")) {
      cbLeft();
    }
    if (isMousePressed("right")) {
      cbRight();
    }
  }
  function coinIconOnClick(){
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
    }
    function facilityIconOnClick(){
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
    }
    function gearIconOnClick() {
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
    }
    function starIconOnClick() {
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
    }
    function convertUnit(num) {
      if(width() <= 500) {
      if (num >= 1000) {
        return (num / 1000).toFixed(2) + "K";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + "M";
      }
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2) + "B";
      }}
      return num.toString();
    }
}

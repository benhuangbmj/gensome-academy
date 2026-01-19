import utilsScene from "./utils";
import userContext from "./contexts/userContext";
import levelContext from "./contexts/levelContext";
import UI from "./gameObjs/UI";
import factory from "./gameObjs/factory/factory";
import handlers from "./handlers/handlers";
import makeMainLevel from "./level";
import backNForth from "./misc/backNForth";
const workerTypes = ["secretary", "tutor"];
const customerTyes = ["student"];

export default function gensomeAcademy() {
  let item1 = {
    sprite: {
      sprite: "card-table",
      frame: 2,
    },
    size: vec2(1, 2),
  };
  const user = utilsScene.generateUser();
  userContext.create(user);
  utilsScene.trackGameTime(user);
  utilsScene.saveGame({ user });
  utilsScene.loadSprites();
  onAdd("student", (obj) => {
    handlers.studentAdded(obj);
    const applyMove = obj.onDraw(() => {
      backNForth(obj, "right");
      applyMove.cancel();
    });
    wait(70, () => {
      obj.destroy();
    });
  });
  const mainLevel = makeMainLevel({ TILE_WIDTH: 64, TILE_HEIGHT: 64 });
  levelContext.create(mainLevel);
  for (let generator in UI) {
    UI[generator](user);
  }

  const julia = factory.createWorker(mainLevel, {
    sprite: "julia",
    width: mainLevel.tileWidth(),
    states: ["idle", "check-in", "teaching", "check-out"],
    salary: 0,
    efficiency: 1,
    rate: 30,
    capacity: 1,
    usage: 0,
    type: workerTypes,
    tilePos: vec2(2, 1),
  });
  julia.play("down");
  loop(80, () => {
    factory.createCustomer(mainLevel, {
      performance: 10,
      satisfaction: 1,
      type: "student",
      sprite: "girl",
      states: ["idle", "matching", "learning", "leaving"],
      width: mainLevel.tileWidth(),
    });
  });
  onMouseMove((eventPos) => handlers.mouseMoved(eventPos, item1));
}

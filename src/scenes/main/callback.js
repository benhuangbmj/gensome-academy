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
  const user = utilsScene.generateUser();
  userContext.create(user);
  utilsScene.trackGameTime(user);
  utilsScene.saveGame({ user });
  utilsScene.loadSprites();
  const screenDim = Math.min(width(), height());
  const [TILE_WIDTH, TILE_HEIGHT] = [screenDim / 25, screenDim / 25];
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
  const mainLevel = makeMainLevel({ TILE_WIDTH, TILE_HEIGHT });
  levelContext.create(mainLevel);
  for (let generator in UI) {
    UI[generator](user);
  }
  const julia = factory.createWorker(mainLevel, {
    sprite: "julia",
    width: 2 * mainLevel.tileWidth(),
    states: ["idle", "check-in", "teaching", "check-out"],
    salary: 0,
    efficiency: 1,
    rate: 30,
    capacity: 1,
    usage: 0,
    type: workerTypes,
    tilePos: vec2(5, 5),
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
      tilePos: vec2(2, 2),
    });
  });
  mainLevel.spawn(
    [sprite("sparkling", { anim: "anim", width: mainLevel.tileWidth() })],
    vec2(10, 10),
  );
}

import utilsScene from "./utils";
import userContext from "./contexts/userContext";
import levelContext from "./contexts/levelContext";
import UIContext from "./contexts/UIContext";
import UI from "./gameObjs/UI";
import factory from "./gameObjs/factory/factory";
import handlers from "./handlers/handlers";
import makeMainLevel from "./level";
const workerTypes = ["secretary", "tutor"];
const GAP = 10;
export default function gensomeAcademy() {
  userContext.create();
  const user = userContext.provide();
  //test
  utilsScene.alignRoster();
  //test

  utilsScene.trackGameTime(user);
  utilsScene.saveGame({ user });
  utilsScene.loadSprites();
  const screenDim = Math.min(width(), height());
  const TILE_SCALE = 0.06;
  const [TILE_WIDTH, TILE_HEIGHT] = [
    screenDim * TILE_SCALE,
    screenDim * TILE_SCALE,
  ];
  const UISpecs = { TILE_WIDTH, TILE_HEIGHT, GAP };
  UIContext.create(UISpecs);
  const mainLevel = makeMainLevel({ TILE_WIDTH, TILE_HEIGHT });
  onAdd("student", (obj) => {
    const onTargetReachedEvent = obj.onTargetReached(() => {
      handlers.studentAdded(obj);
      onTargetReachedEvent.cancel();
    });
    const setTargetEvent = obj.onUpdate(() => {
      obj.setTarget(mainLevel.get("wait")[0].pos);
      setTargetEvent.cancel();
    });
  });
  levelContext.create(mainLevel);
  for (let generator in UI) {
    UI[generator](user);
  }
  const avatar = factory.createWorker(mainLevel, {
    sprite: "wizarding",
    width: mainLevel.tileWidth(),
    states: ["idle", "check-in", "teaching", "check-out", "reserved"],
    salary: 0,
    efficiency: 1,
    rate: 30,
    capacity: 1,
    usage: 0,
    type: workerTypes,
    tilePos: mainLevel.get("wait")[0].tilePos.sub(1, 0),
  });
  avatar.play("anim");
  utilsScene.scheduleNext();
  onKeyDown((key) => {
    if (key == "right") {
      setCamPos(getCamPos().add(vec2(10, 0)));
    }
    if (key == "left") {
      setCamPos(getCamPos().sub(vec2(10, 0)));
    }
    if (key == "up") {
      setCamPos(getCamPos().sub(vec2(0, 10)));
    }
    if (key == "down") {
      setCamPos(getCamPos().add(vec2(0, 10)));
    }
  });
  onKeyPress(handlers.recruit);
}

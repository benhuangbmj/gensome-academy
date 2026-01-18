import utilsScene from "./utils";
import userContext from "./contexts/userContext";
import levelContext from "./contexts/levelContext";
import UI from "./gameObjs/UI";
import factory from "./gameObjs/factory/factory";
import handlers from "./handlers/handlers";
import makeMainLevel from "./level";
const workerTypes = ["secretary", "tutor"];
const customerTyes = ["student"];

export default function gensomeAcademy() {
  const user = utilsScene.generateUser();
  userContext.create(user);
  utilsScene.trackGameTime(user);
  utilsScene.saveGame({ user });
  utilsScene.loadSprites();
  onAdd("student", (obj) => {
    handlers.studentAdded(obj);
    backNForth(obj, "right");
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
    width: 160,
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
  loop(90, () => {
    factory.createCustomer(mainLevel, {
      performance: 10,
      satisfaction: 1,
      type: "student",
      sprite: "girl",
      states: ["idle", "matching", "learning", "leaving"],
      width: mainLevel.tileWidth(),
    });
  });
}

function backNForth(obj, direction) {
  if (direction == "right") {
    const motion = obj.onUpdate(() => {
      obj.moveTo(center().add(vec2(200, 0)), 50);
      if (
        JSON.stringify(obj.pos) === JSON.stringify(center().add(vec2(200, 0)))
      ) {
        motion.cancel();
        obj.play("down");
        wait(3, () => {
          backNForth(obj, "left");
        });
      }
    });
    obj.play("right");
  } else if (direction == "left") {
    const motion = obj.onUpdate(() => {
      obj.moveTo(center().add(vec2(-200, 0)), 50);
      if (
        JSON.stringify(obj.pos) === JSON.stringify(center().add(vec2(-200, 0)))
      ) {
        motion.cancel();
        obj.play("down");
        wait(3, () => {
          backNForth(obj, "right");
        });
      }
    });
    obj.play("left");
  }
}

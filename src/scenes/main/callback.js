import utilsScene from "./utils";
import userContext from "./contexts/userContext";
import UI from "./gameObjs/UI";
import factory from "./gameObjs/factory/factory";
import handlers from "./handlers/handlers";
const workerTypes = ["secretary", "tutor"];
const customerTyes = ["student"];

export default function gensomeAcademy() {
  const user = utilsScene.generateUser();
  userContext.create(user);
  utilsScene.trackGameTime(user);
  utilsScene.saveGame({ user });
  utilsScene.loadSprites();
  for (let generator in UI) {
    UI[generator](user);
  }
  onAdd("student", (obj) => {
    handlers.studentAdded(obj);
    // const addProgress = obj.onUpdate(() => {
    //   if (obj.width > 0) {
    //     obj.use(
    //       progress(30, {
    //         width: obj.width,
    //         height: Math.max(obj.width / 10, 10),
    //         offset: vec2(0, 15).add(vec2(0, obj.height)),
    //         loop: true,
    //         onProgressFinished() {
    //           user.cash++;
    //           obj.destroy();
    //         },
    //       })
    //     );
    //     addProgress.cancel();
    //   }
    // });
    backNForth(obj, "right");
    wait(70, () => {
      obj.destroy();
    });
  });
  const julia = factory.createWorker({
    sprite: "julia",
    width: 160,
    states: ["idle", "check-in", "teaching", "check-out"],
    pos: vec2(100, 100),
    salary: 0,
    efficiency: 1,
    rate: 30,
    capacity: 1,
    usage: 0,
    type: workerTypes,
  });
  julia.play("down");

  loop(90, () => {
    factory.createCustomer({
      performance: 10,
      satisfaction: 1,
      type: "student",
      sprite: "girl",
      states: ["idle", "matching", "learning", "leaving"],
      pos: center(),
      width: 100,
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

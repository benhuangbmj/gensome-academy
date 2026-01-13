import progress from "../../components/progress";
import utilsScene from "./utils";
import UI from "./gameObjs/UI";
import AI from "./AI/AI";
import worker from "../../components/worker";
import factory from "./gameObjs/factory/factory";
const workerTypes = ["secretary", "tutor"];
const customerTyes = ["student"];
export default function gensomeAcademy() {
  const user = utilsScene.generateUser();
  utilsScene.trackGameTime(user);
  utilsScene.loadSprites();
  for (let generator in UI) {
    UI[generator](user);
  }
  onAdd("student", (obj) => {
    const findSecretaryLoop = loop(1, () => {
      const availableSecretary = get("secretary");
      if (availableSecretary.length > 0) {
        findSecretaryLoop.cancel();
        const secretary = availableSecretary[0];
        const student = obj;
        AI.checkIn(secretary, student);
      }
    });
    const addProgress = obj.onUpdate(() => {
      if (obj.width > 0) {
        obj.use(
          progress(5, {
            width: obj.width,
            height: Math.max(obj.width / 10, 10),
            offset: vec2(0, 15).add(vec2(0, obj.height)),
            loop: true,
            onProgressFinished() {
              user.cash++;
            },
          })
        );
        addProgress.cancel();
      }
    });
    backNForth(obj, "right");
  });
  const girl = factory.createCustomer({
    performance: 10,
    satisfaction: 1,
    type: "student",
    sprite: "girl",
    states: ["idle", "matching"],
    pos: center(),
    width: 100,
  });
  const julia = factory.createWorker();
  // add([
  //   sprite("julia", { width: 160 }),
  //   pos(100, 100),
  //   state("idle", ["idle", "check-in", "teach", "check-out"]),
  //   worker({
  //     salary: 0,
  //     efficiency: 1,
  //     rate: 30,
  //     type: workerTypes,
  //   }),
  //   ...workerTypes,
  // ]);
  julia.play("down");
  utilsScene.saveGame({ user });
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

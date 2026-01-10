import progress from "../../components/progress";
import utilsScene from "./utils";
import UI from "./gameObjs/UI";
export default function gensomeAcademy() {
  const user = utilsScene.generateUser();
  utilsScene.trackGameTime(user);
  utilsScene.loadSprites();
  for (let generator in UI) {
    UI[generator](user);
  }
  onAdd("girl", (obj) => {
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
  const girl = add([sprite("girl", { width: 100 }), pos(center()), "girl"]);
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

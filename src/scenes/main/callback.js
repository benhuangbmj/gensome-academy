import progress from "../../components/progress";
import utilsScene from "./utils";
import UI from "./gameObjs/UI";
export default function gensomeAcademy() {
  const user = utilsScene.generateUser();
  utilsScene.loadSprites();
  for (let generator in UI) {
    UI[generator](user);
  }
  onAdd("girl", (obj) => {
    const addProgress = obj.onUpdate(() => {
      if (obj.width > 0) {
        obj.use(
          progress(10, {
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
  });
  add([sprite("girl", { anim: "down", width: 100 }), pos(center()), "girl"]);
  utilsScene.saveGame({ user });
}

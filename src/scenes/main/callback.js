import progressBar from "../../components/progressBar";
import utilsScene from "./utils";
import generateUserStatus from "./gameObjs/userStatus";
const COIN_HEIGHT = 40;
export default function gensomeAcademy() {
  const user = utilsScene.generateUser();
  utilsScene.loadSprites();
  const { userStatus, cash } = generateUserStatus(user);
  onAdd("girl", (obj) => {
    const addProgress = obj.onUpdate(() => {
      if (obj.width > 0) {
        obj.use(
          progressBar({
            width: obj.width,
            height: Math.max(obj.width / 10, 10),
            duration: 1,
            offset: vec2(0, 15).add(vec2(0, obj.height)),
            loop: true,
            onComplete() {
              user.cash++;
              cash.text = `${user.cash}`;
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

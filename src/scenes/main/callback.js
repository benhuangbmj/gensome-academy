import progressBar from "../../components/progressBar";
import loadAllSprites from "./loadSprite";
export default function gensomeAcademy() {
  loadAllSprites();
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
          })
        );
        addProgress.cancel();
      }
    });
  });
  const girl = add([
    sprite("girl", { anim: "down", width: 100 }),
    pos(center()),
    "girl",
  ]);
}

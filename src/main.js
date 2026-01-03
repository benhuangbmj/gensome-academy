import kaplay from "kaplay";
import sceneMain from "./scenes/main/callback";
const environment = import.meta.env.VITE_ENVIRONMENT ?? "main";

// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
  debugKey: "f2",
});

k.loadRoot("./"); // A good idea for Itch.io publishing later

k.scene("main", () => sceneMain());

k.go(environment);

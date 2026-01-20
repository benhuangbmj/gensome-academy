import kaplay from "kaplay";
import sceneMain from "./scenes/main/callback";
import { crew } from "@kaplayjs/crew";

window.environment = import.meta.env.VITE_ENVIRONMENT ?? "production";

// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
  debugKey: "f2",
  plugins: [crew],
});

k.loadRoot("./"); // A good idea for Itch.io publishing later

k.scene("main", () => sceneMain());

k.go("main");

import kaplay from "kaplay";
import { crew } from "@kaplayjs/crew";

import sceneMain from "./scenes/main/callback";
window.environment = import.meta.env.VITE_ENVIRONMENT ?? "production";

// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
  debugKey: "f2",
  plugins: [crew],
});

k.loadRoot("./"); // A good idea for Itch.io publishing later
loadCrew("sprite", "bean");
loadCrew("sprite", "sparkling");

k.scene("main", () => sceneMain());

k.go("main");

import progressBar from "../../components/progressBar";
export default function gensomeAcademy() {
  const BAR_WIDTH = 120;
  const barPos = vec2((width() - BAR_WIDTH) / 2, 200);
  add([
    pos(barPos),
    progressBar({
      width: BAR_WIDTH,
    }),
  ]);
}

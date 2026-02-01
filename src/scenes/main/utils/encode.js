export default function encode(obj, type = "customer") {
  const stats = {};
  stats[type] = obj.getStats();
  const output = JSON.stringify(Object.assign({ sprite: obj.sprite }, stats));
  return output;
}

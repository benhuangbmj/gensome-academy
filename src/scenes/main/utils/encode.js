export default function encode(obj) {
  const output = JSON.stringify(
    Object.assign({ sprite: obj.sprite }, obj.getStats()),
  );
  return output;
}

import levelContext from "../contexts/levelContext";
export default function mousePressedAddItem(btn, item, isApproved) {
  const level = levelContext.provide();
  if (!isApproved || btn != "left") return;
  const tile = level.adjustedPos2Tile(mousePos());
  level.spawn([sprite(item.sprite.sprite, item.sprite)], tile);
}

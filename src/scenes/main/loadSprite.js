function loadAllSprites() {
  loadSprite("coin", "sprites/shining-star-coin.png", {
    sliceX: 6,
    anims: {
      shine: {
        frames: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 5, 3],
        speed: 24,
        loop: true,
      },
    },
  });
  loadSprite("card-table", "sprites/Card Table.png", {
    sliceY: 3,
  });
  loadSprite("girl", "sprites/girl.png", {
    sliceX: 4,
    sliceY: 5,
    anims: {
      down: { from: 12, to: 15, speed: 8, loop: true },
      left: { from: 8, to: 11, speed: 8, loop: true },
      right: { from: 4, to: 7, speed: 8, loop: true },
      up: { from: 16, to: 19, speed: 8, loop: true },
    },
  });
}
export default loadAllSprites;
